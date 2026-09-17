import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.toplivo,
  name: 'Топливо',
  year: 2010,
  folder: '/artist/shmely/albums/2010_toplivo.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/0frmw2fWFkFtuoeobgciN8',
    soundcloud: 'https://soundcloud.com/shmieli/sets/8ds3znf1dyaq',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nFcLyMsmp6FHj0wt6J3w--1qXcmgyX_xY',
    yandexMusic: 'https://music.yandex.ru/album/3444135',
  },
  songs: [
    EnumSongs.toplivoZhizn,
    EnumSongs.avtomobilITi,
    EnumSongs.parusa,
    EnumSongs.zhenshchinaZaRulyom,
    EnumSongs.cheryomukha,
    EnumSongs.melankholiya,
    EnumSongs.laskoviiUrodets,
    EnumSongs.naidi,
    EnumSongs.generatorMechti,
    EnumSongs.khvor,
    EnumSongs.doktorMotorfil,
    EnumSongs.neftAlliluiya,
    EnumSongs.khorovod,
    EnumSongs.plyushevieZombi,
    EnumSongs.trunaNaKolyosakh,
    EnumSongs.bogLyubitSebya,
  ],
};

export default album;
