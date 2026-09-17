import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.zloradostnayaOpuhol,
  name: 'Злорадостная опухоль',
  year: 1999,
  folder: '/artist/shmely/albums/1999_zo.jpg',
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
