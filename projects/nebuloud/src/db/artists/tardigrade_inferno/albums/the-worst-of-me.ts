import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.theWorstOfMe,
  name: 'The Worst of Me',
  year: 2021,
  folder: '/artist/tardigrade_inferno/albums/2021_twom.jpg',
  songs: [EnumSongs.theWorstOfMe, EnumSongs.writeWithBlood],
  info: `
  `,
};

export default album;
