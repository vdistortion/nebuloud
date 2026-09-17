import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.akustika,
  name: 'Акустика',
  year: 2005,
  folder: '/artist/master/albums/akystika_2005.jpg',
  songs: [
    EnumSongs.plachSvireli,
    EnumSongs.torero,
    EnumSongs.visokosniiVek,
    EnumSongs.zhizni,
    EnumSongs.palachi,
    EnumSongs.heavyLambada,
    EnumSongs.pepelNaVetru,
    EnumSongs.igra,
    EnumSongs.kresti,
    EnumSongs.zdesKuyutMetall,
    EnumSongs.veter,
  ],
  info: `
Акустический альбом вышел в свет в конце декабря 2005 года. В альбом вошли как старые хиты, так и две новые композиции.

"Каждый шаг на нашей дороге - новое приключение, испытание и опыт. Этот альбом - ещё одно движение вперёд для нас и для тебя..."



Состав:
А. Страйк - гитара        А. Грановский - бас-гитара
LEXX - гитара, вокал     А. Карпухин - ударные, перкуссия
  `,
};

export default album;
