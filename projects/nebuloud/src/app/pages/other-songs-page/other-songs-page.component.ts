import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-other-songs-page',
  imports: [RouterLink],
  templateUrl: './other-songs-page.component.html',
  styleUrl: './other-songs-page.component.scss',
})
export class OtherSongsPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  public artistName: string = '';
  public artistId: string | null = null;
  public songs: TypeSong[] = [];

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
    this.songs = artist.getSongsWithoutAlbum().sort(artist.sortAsc);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.artistName} | Другие песни`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
