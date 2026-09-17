import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.rcCars,
  name: 'Недетские гонки',
  year: 2003,
  folder: '/artist/master/albums/rc_cars.jpg',
  songs: [
    EnumSongs.rukiProch,
    EnumSongs.mestaKhvatitVsem,
    EnumSongs.ktoKogo,
    EnumSongs.beregis,
    EnumSongs.visokosniiVek,
    EnumSongs.labirint,
    EnumSongs.metalDoktor,
    EnumSongs.master,
    EnumSongs.palachi,
    EnumSongs.son,
    EnumSongs.taran,
  ],
  info: `
Запись 2002 г., саундтрек к компьтерной игре
Алик Грановский - бас, Алексей Страйк - гитара, Андрей Лебедев Крустер - сэмплы, сведение, звуковые эффекты
  `,
};

export default album;
