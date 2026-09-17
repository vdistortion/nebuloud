import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.spookyScarySkeletons,
  name: 'Spooky Scary Skeletons',
  year: 2021,
  folder: '/artist/tardigrade_inferno/albums/2021_sss.jpg',
  songs: [EnumSongs.spookyScarySkeletons],
  info: `
Andrew Gold cover
  `,
};

export default album;
