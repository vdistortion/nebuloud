import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.labirint,
  name: 'Лабиринт',
  year: 1999,
  folder: '/artist/master/albums/labirint_2000.jpg',
  songs: [
    EnumSongs.mestaKhvatitVsem,
    EnumSongs.labirint,
    EnumSongs.visokosniiVek,
    EnumSongs.kresti,
    EnumSongs.son,
    { name: 'Комета 2000' },
    EnumSongs.metalDoktor,
    EnumSongs.okhotnikiZaSchastem,
    { name: 'Никто не забыт, ничто не забыто (бас-соло)' },
    EnumSongs.taran,
  ],
  info: `
Альбом "Лабиринт" записан на студии группы Мастер в конце 1999 года. Музыканты приобрели звукозаписывающую аппаратуру и решили все записывать у себя на базе. Альбом "Лабиринт" был выпущен только в 2001 фирмой "CD-Land" на CD



Состав:
Л.Фомин - гитара           А.Грановский - бас-гитара
Лекс - вокал                   О.Милованов - ударные
  `,
};

export default album;
