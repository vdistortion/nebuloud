import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItem, TypeItems, TypeSong } from '../../../db/types';

@Component({
  selector: 'app-video-page',
  imports: [RouterLink, YouTubePlayer],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss',
})
export class VideoPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  public artist!: TypeItem;
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

    this.artist = this.artists[this.artistId];
    this.artistName = this.artist.artist.name;
    this.songs = this.artist.getAllVideos().sort(this.artist.sortByYears.bind(this.artist));
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.artistName} | Клипы`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
