import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArtistService } from '../../services/artist.service';
import { Analytics } from '../../services/analytics.service';
import artists from '../../../db';
import type { TypeItems } from '../../../db/types';

@Component({
  selector: 'app-gallery-page',
  imports: [],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss',
})
export class GalleryPageComponent implements OnInit {
  private analytics = inject(Analytics);
  public artists: TypeItems = artists;
  protected pictures!: string[];
  protected path!: string;
  protected id!: string;
  protected galleryName: string = '';
  private artistName: string = '';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private artistService: ArtistService,
  ) {
    this.route.params.subscribe(({ artist, gallery }) => {
      const artistItem = this.artists[artist];
      this.id = artistItem.artist.id;
      this.artistName = artistItem.artist.name;
      this.artistService.setArtist(artist);

      if (artistItem.artist.images) {
        const images = artistItem.artist.images[gallery];
        this.pictures = images.pictures;
        this.path = images.path.join('/');
        this.galleryName = images.path[images.path.length - 1];
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.artistName} | Фото | ${this.galleryName}`);
  }

  onClick(event: string) {
    this.analytics.sendEvent(event, { category: 'UI' });
  }
}
