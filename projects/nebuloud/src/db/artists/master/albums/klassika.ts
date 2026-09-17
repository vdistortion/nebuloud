import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.klassika,
  name: 'Классика 1987-2002',
  year: 2001,
  folder: '/artist/master/albums/klassika_1987_2002.jpg',
  songs: [
    EnumSongs.introduktsiya,
    EnumSongs.labirint,
    EnumSongs.sKemTi,
    EnumSongs.yeshcheRazNoch,
    EnumSongs.tolkoTiSam,
    EnumSongs.kresti,
    EnumSongs.iuda,
    { name: 'Амстердам (бас-соло)' },
    EnumSongs.torero,
    EnumSongs.neboVGlazakh,
    EnumSongs.vstanStrakhPreodolei,
    EnumSongs.tatu,
    EnumSongs.volyaIRazum,
    { name: 'Четырнадцатая' },
  ],
  info: `
Летом 2001 года - группа записывает альбом "Классика 1987-2001", в который вошли старые хиты группы в обновленной аранжировке, а так же композиции Алика Грановского: "Тореро" и "С Кем Ты?" написанные им в то время, когда он играл в группе "Ария".



Состав:
Страйк - гитара           А.Грановский - бас-гитара
Лекс - вокал                 О.Милованов - ударные
  `,
};

export default album;
