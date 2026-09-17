import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.chudes16,
  name: '16 чудес',
  year: 2017,
  folder: '/artist/shmely/albums/2016_16.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/20RNbLgkaoqnmqM6aZ5ppb',
    amazonMusic: 'https://music.amazon.com/albums/B06XFXT2PN',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_lvl4Bi2EQ2Cr_pT1KK0COoNLGwDAHRHUE',
    yandexMusic: 'https://music.yandex.ru/album/4090274',
  },
  songs: [
    EnumSongs.shukai,
    { name: 'Душа не ладит с сердцем' },
    EnumSongs.svetitsyaMgla,
    EnumSongs.klycheNaOzera,
    EnumSongs.animatori,
    { name: 'Хаос чорноти' },
    EnumSongs.yaKhochuBachytyTebe,
    { name: 'Барды Чернобыля' },
    { name: 'Бойся себя когда пьян' },
    { name: 'Зомби родстер' },
    { name: 'Ол инклюзив' },
    { name: 'Лавашабаш' },
  ],
};

export default album;
