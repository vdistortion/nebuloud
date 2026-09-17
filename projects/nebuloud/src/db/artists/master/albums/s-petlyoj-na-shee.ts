import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.sPetlyojNaShee,
  name: 'С петлёй на шее',
  year: 1989,
  folder: '/artist/master/albums/spnsh_1989.jpg',
  songs: [
    EnumSongs.neKhotim,
    EnumSongs.palachi,
    EnumSongs.miNeRabi,
    { name: 'Когда я умру...' },
    EnumSongs.bozheKhraniNashuZlost,
    EnumSongs.naplevat,
    { name: 'Амстердам (бас-соло)' },
    EnumSongs.iuda,
    EnumSongs.voina,
    EnumSongs.semKrugovAda,
    EnumSongs.sPetlyoiNaShee,
  ],
  info: `
Альбом "С Петлей На Шее" записан на квартире звукорежиссера Ю.Соколова в городе Новые Мытищи. В трехкомнатную квартиру Ю.Соколова была привезена аппаратура и двенадцатиканальный цифровой магнитофон. Это был первый опыт записи альбома собственными силами. Альбом выпущен в 1989 году на виниле фирмой "Мелодия", и был продан тиражом более двух миллионов экземпляров. Альбом был признан лучшим металлическим альбомом года. В 1995 году был переиздан на CD студией СОЮЗ
Состав:
А.Большаков - гитара      А.Грановский - бас-гитара
М.Серышев - вокал          С.Попов - гитара
И.Молчанов - ударные     К.Покровский - клавишные
  `,
};

export default album;
