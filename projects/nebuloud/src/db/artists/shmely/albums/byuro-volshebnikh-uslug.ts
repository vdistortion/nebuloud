import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.byuroVolshebnikhUslug,
  name: 'Бюро волшебных услуг',
  year: 2017,
  folder: '/artist/shmely/albums/2017_byuroVolshebnikhUslug.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/7yfioAU7ZaF5AmeOgSHOM9',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nOT3PW8Sy9YftLRTCFVQX24HFo0lNVTKk',
    amazonMusic: 'https://music.amazon.com/albums/B06XFYPG4K',
    soundcloud: 'https://soundcloud.com/shmieli/sets/bx2hfgjcverc',
    yandexMusic: 'https://music.yandex.ru/album/4090273',
  },
  songs: [
    EnumSongs.agoniya,
    EnumSongs.bomLbom,
    EnumSongs.vsyo,
    EnumSongs.ivolga,
    EnumSongs.idi,
    EnumSongs.kronos,
    EnumSongs.lakaiOtravu,
    EnumSongs.lyod,
    EnumSongs.molodaya,
    EnumSongs.tishinaIPokoi,
    EnumSongs.sadizm,
    EnumSongs.trupniePyatna,
    { name: 'Хули пули праху' },
    { name: 'Бюро волшебных услуг' },
    { name: 'Игра голова' },
    EnumSongs.kusai,
    { name: 'Лафа' },
    { name: 'Я увольняюсь' },
  ],
};

export default album;
