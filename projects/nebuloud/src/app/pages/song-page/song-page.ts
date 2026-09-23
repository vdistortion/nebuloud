import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { map } from 'rxjs';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { SeoService } from '../../services/seo.service';
import { SUGGESTION_WEBHOOK_URL } from '../../config';
import { artistSlugForCurrentHost } from '../../config';
import type { ArtistProfile } from '../../models/content.models';
import type { CatalogAlbum, CatalogSong } from '../../models/content.models';

@Component({
  selector: 'app-song-page',
  imports: [RouterLink, YouTubePlayer],
  templateUrl: './song-page.html',
  styleUrl: './song-page.scss',
})
export class SongPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  readonly suggestionWebhookUrl = inject(SUGGESTION_WEBHOOK_URL);

  readonly artistId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('artist') ?? artistSlugForCurrentHost())),
    { initialValue: artistSlugForCurrentHost() },
  );
  readonly songId = toSignal(this.route.paramMap.pipe(map((params) => params.get('song'))), {
    initialValue: null,
  });
  readonly resolvedSong = toSignal(
    this.route.data.pipe(map((data) => data['song'] as CatalogSong | undefined)),
    { initialValue: undefined },
  );
  readonly resolvedArtistProfile = toSignal(
    this.route.data.pipe(map((data) => data['artistProfile'] as ArtistProfile | undefined)),
    { initialValue: undefined },
  );
  readonly artistName = computed(() => this.resolvedArtistProfile()?.name ?? '');
  readonly song = computed<CatalogSong | undefined>(() => this.resolvedSong());
  readonly albums = computed<CatalogAlbum[]>(() => {
    const song = this.song();
    const profile = this.resolvedArtistProfile();
    return song
      ? song.albums
          .map((id) => profile?.albums.find((album) => album.id === id))
          .filter((album): album is CatalogAlbum => Boolean(album))
      : [];
  });
  readonly suggestionOpen = signal(false);
  readonly suggestionText = signal('');
  readonly suggestionComment = signal('');
  readonly suggestionSource = signal('');
  readonly suggestionContact = signal('');
  readonly suggestionState = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const songId = this.songId() ?? '';
      const song = this.song();

      this.artistService.setArtist(artistId, '', songId);
      this.seo.set({
        title: song ? `${song.title} | ${this.artistName()}` : 'Песня не найдена',
        description: song
          ? `Текст песни «${song.title}» — ${this.artistName()}.`
          : 'Песня не найдена',
      });
    });
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }

  async submitSuggestion() {
    const song = this.song();
    const artistId = this.artistId();
    if (!song || !artistId || !this.suggestionWebhookUrl || !this.suggestionText().trim()) return;

    this.suggestionState.set('sending');
    try {
      const response = await fetch(this.suggestionWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: song.lyrics.trim() ? 'correction' : 'new_lyrics',
          artist_slug: artistId,
          song_slug: song.id,
          song_title: song.title,
          page_url: globalThis.location.href,
          current_lyrics: song.lyrics,
          proposed_lyrics: this.suggestionText().trim(),
          comment: this.suggestionComment().trim(),
          source_url: this.suggestionSource().trim(),
          contact: this.suggestionContact().trim(),
        }),
      });
      if (!response.ok) throw new Error(`Suggestion request failed: ${response.status}`);
      this.suggestionState.set('sent');
    } catch {
      this.suggestionState.set('error');
    }
  }
}
