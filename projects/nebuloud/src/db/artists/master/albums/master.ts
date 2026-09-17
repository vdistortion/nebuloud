import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.master,
  name: 'Мастер',
  year: 1987,
  folder: '/artist/master/albums/master_1987.jpg',
  songs: [
    EnumSongs.master,
    EnumSongs.beregis,
    EnumSongs.rukiProch,
    EnumSongs.shchitIMech,
    EnumSongs.yeshcheRazNoch,
    EnumSongs.volyaIRazum,
    EnumSongs.vstanStrakhPreodolei,
    EnumSongs.khraniMenya,
    EnumSongs.ktoKogo,
  ],
  info: `
Альбом "Мастер" записывался на фирме "Мелодия". Фирма "Мелодия" помещалась на территории старого костела на улице Станкевича, во дворе, где находился автобус Тонвагин со звукозаписывающей аппаратурой. Именно в нем был записан и сведен первый альбом. Альбом выпущен тоже на фирме "МЕЛОДИЯ" в 1987 году на виниле и был продан тиражом более одного миллиона экземпляров. В 1995 году альбом переиздан на CD фирмой СОЮЗ.
Состав:
А.Большаков - гитара      А.Грановский - бас-гитара
М.Серышев - вокал          С.Попов - гитара
И.Молчанов - ударные     К.Покровский - клавишные
  `,
};

export default album;
