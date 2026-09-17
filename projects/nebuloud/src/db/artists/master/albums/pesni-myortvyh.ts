import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.pesniMyortvyh,
  name: 'Песни мёртвых',
  year: 1996,
  folder: '/artist/master/albums/pesni_mertvix_1996.jpg',
  songs: [
    EnumSongs.pesniMyortvikh,
    EnumSongs.dikieGusi,
    EnumSongs.daiteSvet,
    EnumSongs.pepelNaVetru,
    EnumSongs.nadoelo,
    EnumSongs.tolkoTiSam,
    EnumSongs.yaNeKhochuVoini,
    EnumSongs.tatu,
    { name: 'Ночь' },
    EnumSongs.korablDurakov,
  ],
  info: `
Альбом "Песни мертвых" записан на студии "Ария Records" в марте 1996 года. Звукорежиссеры - В.Холстинин и Д.Калинин. Выпущен фирмой "Flam Records" в 1996 году. В песне Тату в записи хора принимали участие: А.Трофимов, А.Гирнык (ZZ-Top), Юрий Васин (артист ансамбля Игоря Моисеева).

Состав:
С.Попов - гитара           А.Грановский - бас-гитара
М.Серышев - вокал       Т.Шендер - ударные
  `,
};

export default album;
