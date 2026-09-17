import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.executionIsFun,
  name: 'Execution is Fun!',
  year: 2017,
  folder: '/artist/tardigrade_inferno/albums/2017_eif.jpg',
  songs: [EnumSongs.executionIsFun],
  info: `
  `,
};

export default album;
