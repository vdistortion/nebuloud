import type { TypeStreaming } from '../../db/types';

export interface CatalogAlbum {
  id: string;
  name: string;
  year: number;
  cover?: string;
  streaming?: TypeStreaming;
}

export interface ArtistProfile {
  id: string;
  name: string;
  image: string;
  country: string[];
  streaming?: TypeStreaming;
  albums: CatalogAlbum[];
  hasImages: boolean;
}
