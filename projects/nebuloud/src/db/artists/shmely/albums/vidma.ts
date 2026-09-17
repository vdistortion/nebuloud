import { TypeAlbum } from '../../../types';
import { EnumAlbums } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.vidma,
  name: 'Вiдьма',
  year: 2021,
  folder: '/artist/shmely/albums/2021_vidma.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/04BYic7HwDIZ0S7YzbvzHe',
    bandcamp: 'https://shmely.bandcamp.com/track/i-witch',
  },
  songs: [{ name: 'Вiдьма' }],
  info: `released December 15, 2021`,
};

export default album;
