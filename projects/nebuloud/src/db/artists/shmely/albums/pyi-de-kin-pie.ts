import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.pyiDeKinPie,
  name: "Пий, де кiнь п'є",
  year: 2022,
  folder: '/artist/shmely/albums/2022_pyiDeKinPie.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/2gWRH9oJlyhAhcqQhERU27',
    bandcamp: 'https://shmely.bandcamp.com/track/i-drink-where-horses-drink',
  },
  songs: [EnumSongs.pyiDeKinPie],
  info: `released February 1, 2022`,
};

export default album;
