import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { StreamingListComponent } from '../../components/ui/streaming-list/streaming-list.component';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { TrimPipe } from '../../trim.pipe';
import { ContentService } from '../../services/content.service';
import type { TypeAlbum, TypeItem, TypeItems } from '../../../db/types';

type AlbumTrack = {
  name: string;
  id: string;
  duration: number;
  isText: boolean;
};

@Component({
  selector: 'app-album-page',
  imports: [RouterLink, TrimPipe, StreamingListComponent],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss',
})
export class AlbumPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly artistService = inject(ArtistService);
  private readonly analytics = inject(Analytics);
  private readonly content = inject(ContentService);

  readonly artists: TypeItems = this.content.artists;
  readonly artistId = toSignal(this.route.paramMap.pipe(map((params) => params.get('artist'))), {
    initialValue: null,
  });
  readonly albumId = toSignal(this.route.paramMap.pipe(map((params) => params.get('album'))), {
    initialValue: null,
  });
  readonly artist = computed<TypeItem | undefined>(() => {
    const id = this.artistId();
    return id ? this.artists[id] : undefined;
  });
  readonly artistName = computed(() => this.artist()?.artist.name ?? '');
  readonly album = computed<TypeAlbum | undefined>(() => {
    const item = this.artist();
    const id = this.albumId();
    return item && id ? item.albums[id] : undefined;
  });
  readonly songs = computed<AlbumTrack[]>(() => {
    const item = this.artist();
    const album = this.album();
    if (!item || !album) return [];

    return album.songs.map((songId) => {
      if (typeof songId === 'string') {
        const song = item.songs[songId];
        return {
          id: song.id,
          name: song.name[0],
          duration: song.duration ?? 0,
          isText: !!song.text.trim(),
        };
      }

      if (Array.isArray(songId)) {
        const [id, { name }] = songId;
        const song = item.songs[id];
        return { id, name: name[0], duration: song.duration ?? 0, isText: !!song.text.trim() };
      }

      return { name: songId.name, id: '', duration: 0, isText: false };
    });
  });

  constructor() {
    effect(() => {
      const artistId = this.artistId() ?? '';
      const albumId = this.albumId() ?? '';
      const album = this.album();

      this.artistService.setArtist(artistId, albumId);
      this.titleService.setTitle(
        album ? `${album.name} (${album.year}) | ${this.artistName()}` : 'Альбом не найден',
      );
    });
  }

  getTime(duration: number): string {
    return `${Math.trunc(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
  }

  formatTrackNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
