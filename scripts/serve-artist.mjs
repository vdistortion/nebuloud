import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
const serveArgs = [];
let artistSlug;
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === '--slug') {
    artistSlug = args[index + 1];
    index += 1;
  } else if (arg.startsWith('--slug=')) {
    artistSlug = arg.slice('--slug='.length);
  } else {
    serveArgs.push(arg);
  }
}

if (!artistSlug) {
  throw new Error('Choose an artist: npm run start:artist -- --slug master --port 4201');
}

const directusUrl = (process.env['DIRECTUS_URL'] ?? 'http://localhost:8056').replace(/\/$/, '');
const configPath = resolve('projects/shared/public/config.js');
const originalConfig = await readFile(configPath, 'utf8');
const defaultSuggestionWebhookUrl =
  originalConfig.match(/suggestionWebhookUrl:\s*(['"])(.*?)\1/)?.[2] ?? '';
const ngCli = resolve('node_modules/@angular/cli/bin/ng.js');

const response = await fetch(
  `${directusUrl}/items/artists?${new URLSearchParams({
    fields: 'slug',
    'filter[slug][_eq]': artistSlug,
    limit: '1',
  })}`,
);
if (!response.ok) throw new Error(`Could not read artist from Directus (${response.status}).`);
const payload = await response.json();
if (!payload.data?.length) throw new Error(`Artist "${artistSlug}" was not found in Directus.`);

const runtimeConfig = {
  directusUrl,
  suggestionWebhookUrl: process.env['SUGGESTION_WEBHOOK_URL'] ?? defaultSuggestionWebhookUrl,
  artistSlug,
};

try {
  await writeFile(
    configPath,
    `globalThis.__NEBULOUD_CONFIG__ = ${JSON.stringify(runtimeConfig, null, 2)};\n`,
  );
  const result = spawnSync(
    process.execPath,
    [ngCli, 'serve', 'artist', '--host', '0.0.0.0', ...serveArgs],
    { stdio: 'inherit', env: { ...process.env, ARTIST_SLUG: artistSlug } },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await writeFile(configPath, originalConfig);
}
