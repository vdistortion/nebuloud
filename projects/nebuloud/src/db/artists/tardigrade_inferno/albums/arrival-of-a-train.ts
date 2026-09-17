import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.arrivalOfATrain,
  name: 'Arrival of a Train',
  year: 2023,
  folder: '/artist/tardigrade_inferno/albums/2023_mini.jpg',
  songs: [
    EnumSongs.arrivalOfATrain,
    EnumSongs.firePlagueAndLocust,
    EnumSongs.engineOfSkin,
    EnumSongs.evoke,
  ],
  info: `
  `,
};

export default album;
