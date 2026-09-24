import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlService } from '../../../services/asset-url.service';

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
  private readonly assetUrl = inject(AssetUrlService);

  get folder() {
    return this.assetUrl.resolve(this.image);
  }
}
