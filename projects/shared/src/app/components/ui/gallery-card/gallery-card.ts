import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlService } from '../../../services/asset-url.service';

@Component({
  selector: 'app-gallery-card',
  imports: [RouterLink],
  templateUrl: './gallery-card.html',
  styleUrl: './gallery-card.scss',
})
export class GalleryCard {
  @Input({ required: true }) public link!: string;
  @Input({ required: true }) public name!: string;
  @Input() public image: string | undefined;
  @Input() public year: number = 0;
  @Input() public thumbnail: boolean = false;
  private readonly assetUrl = inject(AssetUrlService);

  imageUrl(value: string): string {
    return this.assetUrl.resolve(value);
  }
}
