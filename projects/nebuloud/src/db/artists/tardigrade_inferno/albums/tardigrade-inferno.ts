import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.tardigradeInferno,
  name: 'Tardigrade Inferno',
  year: 2016,
  folder: '/artist/tardigrade_inferno/albums/2016_ti.jpg',
  songs: [EnumSongs.lovelyHost, EnumSongs.AGrainOfSand, EnumSongs.underwaterValentine],
  info: `
  `,
};

export default album;
