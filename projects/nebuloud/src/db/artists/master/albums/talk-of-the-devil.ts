import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.talkOfTheDevil,
  name: 'Talk of the Devil',
  year: 1991,
  folder: '/artist/master/albums/talk_of_the_devil_1992.jpg',
  songs: [
    { name: 'Intro Golgotha' },
    EnumSongs.talkOfTheDevil,
    EnumSongs.danger,
    EnumSongs.fallenAngel,
    EnumSongs.liveToDie,
    EnumSongs.tsar,
    EnumSongs.heroes,
    { name: 'Romance (bass-solo)' },
    EnumSongs.iHateYourSex,
    { name: 'Paranoid' },
  ],
  info: `
Альбом "Talk Of The Devil" был выпущен в 1991 году на фирме "MOROZ Records" - LP (виниловый диск). Запись сделана на студии "SNC-records", звукорежиссер - Евгений Трушин. Также Михаил Серышев пригласил людей из храма Михаила Архангела для записи хора в песне Fallen Angel.

Состав:
А.Большаков - гитара      А.Грановский - бас-гитара
М.Серышев - вокал

Сессионные музыканты:
С.Попов - гитара                                          В.Ермаков - барабаны (1)
С.Ефимов - барабаны (6)                             А.Моисеев - барабаны (7)
А.Шатуновский - барабаны (2, 3, 4, 5)      И.Кожин - гитара (6)
хор храма Михаила Архангела (3)
  `,
};

export default album;
