import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.cekhPoReabilitaciiParanoikov,
  name: 'Цех по реабилитации параноиков',
  year: 2010,
  folder: '/artist/shmely/albums/2010_crp.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/74KcaQJrAjhzeHvW6rZUIQ',
    soundcloud: 'https://soundcloud.com/shmieli/sets/hig64yogvrqd',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_mPPAXZrdGJIx_q2kUTz6POPoJdG26koUc',
    yandexMusic: 'https://music.yandex.ru/album/3444136',
  },
  songs: [
    EnumSongs.svetOstanovilsya,
    EnumSongs.otvaliMoyaChereshnya,
    [EnumSongs.biliMi, { name: ['Были мы (new version)'] }],
    EnumSongs.yaKhochuBitRobotom,
    [EnumSongs.katyonka, { name: ['Катёнка (new version)'] }],
    EnumSongs.tsekhPoReabilitatsiiParanoikov,
    EnumSongs.pesenkaPlastilina2,
    [EnumSongs.lechebnitsa, { name: ['Лечебница (new version)'] }],
    EnumSongs.zagovorka,
    { name: 'Паника (из цикла Школьные песни)' },
    EnumSongs.pochta,
    [EnumSongs.khalyava, { name: ['Халява (из цикла Школьные песни)'] }],
  ],
};

export default album;
