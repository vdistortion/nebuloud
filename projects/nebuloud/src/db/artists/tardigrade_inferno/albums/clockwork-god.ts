import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.clockworkGod,
  name: 'Clockwork God',
  year: 2023,
  folder: '/artist/tardigrade_inferno/albums/2023_cg.jpg',
  songs: [EnumSongs.clockworkGod, EnumSongs.ringmasterHasToDie],
  info: `
  `,
};

export default album;
