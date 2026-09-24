import { spawnSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import process from 'node:process';

const mainDomain = normalizeDomain(process.env['MAIN_DOMAIN'] ?? 'nebuloud.zvalentin.com');
if (!mainDomain) throw new Error('MAIN_DOMAIN must be a valid hostname.');
const directusUrl = (process.env['DIRECTUS_URL'] ?? 'http://localhost:8056').replace(/\/$/, '');
const directusDomain = new URL(directusUrl).hostname.toLowerCase();
if (mainDomain === directusDomain)
  throw new Error('MAIN_DOMAIN must differ from the Directus API domain.');
const outputRoot = resolve('dist/sites');
const publicConfigPath = resolve('projects/shared/public/config.js');
const deployOutput = resolve(outputRoot, 'deploy');

function normalizeDomain(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return undefined;
  if (/[/:?#@\\]/.test(raw)) {
    throw new Error(`Invalid site domain "${raw}". Enter a hostname without protocol or path.`);
  }

  let domain;
  try {
    domain = new URL(`https://${raw}`).hostname.toLowerCase().replace(/\.$/, '');
  } catch {
    throw new Error(`Invalid site domain "${raw}".`);
  }

  const labels = domain.split('.');
  if (
    labels.length < 2 ||
    labels.some((label) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
  ) {
    throw new Error(`Invalid site domain "${raw}".`);
  }
  return domain;
}

function safeSlug(value) {
  const slug = String(value ?? '').trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error(`Artist slug "${slug}" cannot be used in generated site paths.`);
  }
  return slug;
}

function nginxEscape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getArtists() {
  const params = new URLSearchParams({ fields: 'id,slug,site_domain', limit: '-1' });
  const response = await fetch(`${directusUrl}/items/artists?${params}`);
  if (!response.ok) {
    throw new Error(
      `Could not read artists from Directus (${response.status}). Ensure artists.site_domain exists and is publicly readable.`,
    );
  }

  const payload = await response.json();
  const domains = new Set([mainDomain, directusDomain]);
  return payload.data.map((item) => {
    const slug = safeSlug(item.slug);
    const siteDomain = normalizeDomain(item.site_domain);
    if (siteDomain && domains.has(siteDomain)) {
      throw new Error(
        `The domain "${siteDomain}" is assigned more than once or conflicts with another service domain.`,
      );
    }
    if (siteDomain) domains.add(siteDomain);
    return { id: String(item.id), slug, siteDomain };
  });
}

function makeRuntimeConfig(artistSlug) {
  const config = {
    directusUrl,
    suggestionWebhookUrl: process.env['SUGGESTION_WEBHOOK_URL'] ?? '',
    ...(artistSlug ? { artistSlug } : {}),
  };
  return `globalThis.__NEBULOUD_CONFIG__ = ${JSON.stringify(config, null, 2)};\n`;
}

function runBuild(project, outputPath, artistSlug) {
  const ngCli = resolve('node_modules/@angular/cli/bin/ng.js');
  const outputArgument = relative(process.cwd(), outputPath).split(sep).join('/');
  const result = spawnSync(
    process.execPath,
    [ngCli, 'build', project, '--configuration=production', `--output-path=${outputArgument}`],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: { ...process.env, ARTIST_SLUG: artistSlug ?? '' },
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${project} SSG build failed.`);
}

function createNginxConfig(artists) {
  const catalogRoot = '/usr/share/nginx/html/sites/catalog/browser';
  const siteRoots = [
    `    ${mainDomain} ${catalogRoot};`,
    ...artists
      .filter((artist) => artist.siteDomain)
      .map(
        (artist) =>
          `    ${artist.siteDomain} /usr/share/nginx/html/sites/artists/${artist.slug}/browser;`,
      ),
  ];
  const redirects = artists
    .filter((artist) => artist.siteDomain)
    .flatMap((artist) => [
      `    ~^${nginxEscape(mainDomain)}/artist/${nginxEscape(artist.slug)}(?:/(.*))?$ https://${artist.siteDomain}/$1;`,
      `    ~^${nginxEscape(artist.siteDomain)}/artist/${nginxEscape(artist.slug)}(?:/(.*))?$ /$1;`,
    ]);

  return `map $host $site_root {
  default ${catalogRoot};
${siteRoots.join('\n')}
}

map "$host$uri" $legacy_artist_redirect {
  default "";
${redirects.join('\n')}
}

server {
  listen 80;
  server_name _;

  if ($legacy_artist_redirect != "") {
    return 301 $legacy_artist_redirect$is_args$args;
  }

  root $site_root;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location = /config.js {
    try_files $uri =404;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
  }

  location ~* \\.(?:css|js|woff2?|png|jpg|jpeg|gif|svg|webp|ico|pdf)$ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
`;
}

const originalRuntimeConfig = await readFile(publicConfigPath, 'utf8');
try {
  const artists = await getArtists();
  const hostedArtists = artists.filter((artist) => artist.siteDomain);

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(resolve(outputRoot, 'artists'), { recursive: true });
  await mkdir(deployOutput, { recursive: true });
  if (!hostedArtists.length) {
    await writeFile(
      resolve(outputRoot, 'artists', 'empty-site-list.txt'),
      'No artist domains are configured.\n',
    );
  }

  await writeFile(publicConfigPath, makeRuntimeConfig(undefined));
  runBuild('catalog', resolve(outputRoot, 'catalog'), undefined);

  for (const artist of hostedArtists) {
    await writeFile(publicConfigPath, makeRuntimeConfig(artist.slug));
    runBuild('artist', resolve(outputRoot, 'artists', artist.slug), artist.slug);
  }

  const webDomains = [mainDomain, ...hostedArtists.map((artist) => artist.siteDomain)];
  const corsOrigins = webDomains.map((domain) => `https://${domain}`);
  await writeFile(
    resolve(deployOutput, 'deploy.env'),
    `WEB_DOMAINS="${webDomains.join(' ')}"\nCORS_ORIGIN="${corsOrigins.join(',')}"\n`,
  );
  await writeFile(resolve(deployOutput, 'nginx.conf'), createNginxConfig(artists));
  await writeFile(
    resolve(outputRoot, 'manifest.json'),
    `${JSON.stringify({ mainDomain, artists: hostedArtists }, null, 2)}\n`,
  );
} finally {
  await writeFile(publicConfigPath, originalRuntimeConfig);
}
