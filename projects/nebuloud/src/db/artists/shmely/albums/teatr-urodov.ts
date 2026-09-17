import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.teatrUrodov,
  name: 'Театр уродов',
  year: 2011,
  folder: '/artist/shmely/albums/2011_teatr.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/40ou3ofmt60WN6Z1LXpF0p',
    soundcloud: 'https://soundcloud.com/shmieli/sets/qjbdjlashmzr',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_liV01e1JDnannkLWqdmM7BJv613aPj9Ws',
    yandexMusic: 'https://music.yandex.ru/album/3444134',
  },
  songs: [
    EnumSongs.ulyot,
    EnumSongs.sanitarka,
    EnumSongs.tatuNaPope,
    EnumSongs.maestroUzhasov,
    EnumSongs.dorogaPusta,
    EnumSongs.zelyoniiPoezd,
    EnumSongs.fokusnik,
    EnumSongs.potselui,
    EnumSongs.akhUYeli,
    EnumSongs.malo,
    EnumSongs.teatrUrodov,
    EnumSongs.kraz255,
    EnumSongs.sudba,
    EnumSongs.muMuZhiva,
  ],
};

export default album;
