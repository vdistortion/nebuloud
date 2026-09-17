import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlbumCardComponent } from '../../components/ui/album-card/album-card.component';
import { StreamingListComponent } from '../../components/ui/streaming-list/streaming-list.component';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeAlbum, TypeItem, TypeItems, TypeStreaming } from '../../../db/types';

@Component({
  selector: 'app-artist-page',
  imports: [AlbumCardComponent, StreamingListComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
})
export class ArtistPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  public artistName: string = '';
  public artistId: string | null = null;
  public albums: TypeAlbum[] = [];
  public streaming: TypeStreaming | undefined;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private artistService: ArtistService,
  ) {
    this.route.params.subscribe(({ artist }) => {
      this.artistService.setArtist(artist);
    });
    this.artistId = this.route.snapshot.paramMap.get('artist');
    if (!this.artistId) return;

    const artist: TypeItem = this.artists[this.artistId];
    this.streaming = artist.artist.streaming;
    this.artistName = artist.artist.name;
    this.albums = artist.artist.albums.map((albumId) => {
      return artist.albums[albumId];
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.artistName} | Дискография`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
