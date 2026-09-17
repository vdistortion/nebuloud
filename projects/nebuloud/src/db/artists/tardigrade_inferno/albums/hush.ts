import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.hush,
  name: 'Hush',
  year: 2026,
  folder: '/artist/tardigrade_inferno/albums/2026_hush.jpg',
  songs: [
    { name: 'The Final Show' },
    EnumSongs.hideNSeek,
    { name: 'Deadly Fairytales' },
    { name: 'All In Your Head' },
    { name: 'Dead Fish Smile' },
    { name: 'Subatomic Heist' },
    { name: 'I.C.D.' },
    { name: 'Goor' },
    { name: 'Hush' },
    { name: 'Hypograph' },
    { name: 'I Am Eternal' },
  ],
  info: `
  `,
};

export default album;
