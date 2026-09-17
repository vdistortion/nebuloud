import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-songs-page',
  imports: [RouterLink],
  templateUrl: './songs-page.component.html',
  styleUrl: './songs-page.component.scss',
})
export class SongsPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  public artistName: string = '';
  public artistId: string | null = null;
  public songs: TypeSong[] = [];
  public isOtherSongs: boolean = false;

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
    this.artistName = artist.artist.name;
    this.songs = artist.getSongsWithTexts().sort(artist.sortAsc);
    this.isOtherSongs = artist.getSongsWithoutAlbum().length > 0;
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.artistName} | Все песни`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
