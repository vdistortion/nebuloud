import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.paraTrupov,
  name: 'Пара трупов',
  year: 2013,
  folder: '/artist/shmely/albums/2013_para.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/6AfviE2K704Bym6YNCdMMk',
    soundcloud: 'https://soundcloud.com/shmieli/sets/yqpyvlpyb45p',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nQT0FMPii6bQHu7gPMH0Cu3X9kinOkYbU',
    yandexMusic: 'https://music.yandex.ru/album/3444132',
  },
  songs: [
    EnumSongs.zvyozdiSvetyatYarche,
    EnumSongs.belieChulochki,
    EnumSongs.paraTrupov,
    EnumSongs.naKonechnomGorizonte,
    EnumSongs.novayaRadost,
    EnumSongs.kuklaGerda,
    EnumSongs.prostitutkiMoskvi,
    EnumSongs.dizain,
    EnumSongs.poslednyayaLyubov,
    EnumSongs.ekskursiyaPoAdu,
    EnumSongs.ansambl,
    EnumSongs.grobovshchik,
    EnumSongs.vMoreNaMeli,
    EnumSongs.rasprodazha,
    EnumSongs.narisovanniiPyos,
  ],
};

export default album;
