import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Title } from '@angular/platform-browser';
import { AlbumCardComponent } from '../../components/ui/album-card/album-card.component';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import { TrimPipe } from '../../trim.pipe';
import artists from '../../../db';
import type { TypeAlbum, TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-song-page',
  imports: [TrimPipe, YouTubePlayer, AlbumCardComponent],
  templateUrl: './song-page.component.html',
  styleUrl: './song-page.component.scss',
})
export class SongPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  public artistName: string = '';
  public artistId: string | null = null;
  public albums: TypeAlbum[] = [];
  public song: TypeSong | null = null;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private artistService: ArtistService,
  ) {
    this.route.params.subscribe(({ artist, song }) => {
      this.artistService.setArtist(artist, '', song);
    });
    this.artistId = this.route.snapshot.paramMap.get('artist');
    const songId: string | null = this.route.snapshot.paramMap.get('song');
    if (!this.artistId || !songId) return;

    const artist: TypeItem = this.artists[this.artistId];
    this.artistName = artist.artist.name;
    this.song = artist.songs[songId];

    this.albums = this.song.albums.map((albumId) => {
      return artist.albums[albumId];
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.song?.name[0]} | ${this.artistName}`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
