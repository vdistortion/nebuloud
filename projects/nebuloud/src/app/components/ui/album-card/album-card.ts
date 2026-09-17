import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  get folder() {
    return this.image ?? '/album-card.jpg';
  }
}
