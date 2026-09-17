import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.mizantropiya,
  name: 'Мизантропия',
  year: 2017,
  folder: '/artist/shmely/albums/2016_mizantropiya.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/5fyLR7SyykWK1EmVKesNNK',
    amazonMusic: 'https://music.amazon.com/albums/B01N4X41F9',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_ly9XGbpMjncfPi2jDs8Kyq9bm47Iiezuc',
    yandexMusic: 'https://music.yandex.ru/album/4184010',
  },
  songs: [
    { name: 'Летальные потехи' },
    { name: 'Хотив спитати' },
    { name: 'Наоборот' },
    { name: 'Не сумувати' },
    { name: 'Поздно планировать жизнь' },
    EnumSongs.metalevyiSvit,
    EnumSongs.mekhaniki,
    EnumSongs.chovenStrakhu,
    { name: 'Мизантропия' },
    EnumSongs.avtomobilyzm,
    EnumSongs.adskayaMashina,
    [EnumSongs.domStroi, { name: ['Бесконечность'] }],
    { name: 'Сваи' },
    { name: 'Ток' },
    { name: 'Ведьмы мои' },
  ],
};

export default album;
