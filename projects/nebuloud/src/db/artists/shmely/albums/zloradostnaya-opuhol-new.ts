import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.zloradostnayaOpuholNew,
  name: 'Злорадостная опухоль. Переиздание',
  year: 2016,
  folder: '/artist/shmely/albums/2016_zo.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/4Q4riSrf2rdfmY6EllfbRp',
    soundcloud: 'https://soundcloud.com/shmieli/sets/psdtuxxraexq',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_lEU8oxwMxMRJ8Qm8pCykRlxwEBZBbYlK0',
    yandexMusic: 'https://music.yandex.ru/album/3444126',
  },
  songs: [
    EnumSongs.biliMi,
    { name: 'Лезвие' },
    { name: 'Песенка пластилина' },
    { name: 'Злорадостная опухоль' },
    { name: 'Глисты' },
    EnumSongs.sheikSheikChaChaCha,
    EnumSongs.lechebnitsa,
    { name: 'Смирительная рубаха' },
    { name: 'Мутанты' },
    EnumSongs.dzhagiMertveeVsekhMyortvikh,
    { name: 'Апокалипсис' },
    { name: 'Печальная история' },
  ],
};

export default album;
