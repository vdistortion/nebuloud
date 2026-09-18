import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DIRECTUS_URL } from '../../../config';

@Component({
  selector: 'app-album-card',
  imports: [RouterLink],
  templateUrl: './album-card.html',
  styleUrl: './album-card.scss',
})
export class AlbumCard {
  @Input({ required: true }) public link!: string;
  @Input({ required: true }) public name!: string;
  @Input() public image: string | undefined;
  @Input() public year: number = 0;
  @Input() public thumbnail: boolean = false;
  private readonly directusUrl = inject(DIRECTUS_URL);

  get folder() {
    return this.imageUrl(this.image ?? '/album-card.jpg');
  }

  imageUrl(value: string): string {
    return value.startsWith('/assets/') ? `${this.directusUrl}${value}` : `.${value}`;
  }
}
