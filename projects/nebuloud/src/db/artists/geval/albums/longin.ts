import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.longin,
  name: 'Лонгин',
  year: 2012,
  folder: '/artist/geval/albums/4.webp',
  songs: [
    EnumSongs.longin,
    EnumSongs.harizma,
    EnumSongs.tretijRim,
    EnumSongs.artefakt,
    EnumSongs.ikar,
    EnumSongs.volki,
    EnumSongs.gotika,
    EnumSongs.gorodskojRoman,
    EnumSongs.labirint,
    EnumSongs.fobosIdejmos,
  ],
  info: `
В мае 2012 г. на лейбле Dizzaster вышел третий альбом московской Industrial Metal группы ГЕВАЛ - "Longin". Презентация диска состоится 12 мая в клубе "Milk".
«Лонгин» концептуально выстроен в лучших традициях Гевала, через весь альбом прослеживается четкая сюжетная линия, которая с каждой песней дает все глубже погрузится в мир хитросплетенных поэтических метафор и алегорий, узнать в этих сюжетах себя, и при этом не потерять основной главной мысли альбома.
«Лонгин» – это целая повесть о жизни, любви, предательстве и смерти… Марш, Трагедия, Срыв, Драма, Ужас и Душа – только группе Гевал удалось совместить все эти понятия в едином целом, альбоме «ЛОНГИН».

Состав:
Олег Юргенс - Вокал, Музыка, Тексты, Идея
Евгений Сухотин - Гитара, Музыка
Александр Курбатов - Клавишные, Электроника
Василий Горшков - Ударные
Евгений Нестеров - Бас
  `,
};

export default album;
