import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.vsyoVoImyaCheloveka,
  name: ['Всё во имя человека'],
  albums: [EnumAlbums.spazmyRoka],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Реклама и песни,
Оружье, дороги,
Зараза, лекарства,
Протезы и боги

Всё во имя человека,
Всё для блага его…
Всё во имя человека,
Всё для блага его…
Всё, всё для блага…
Всё, всё для блага…

Расстрелы и свадьбы,
Церковные книги,
Костюмы и платья,
Лимоны и фиги

Машины и деньги,
Тюремные сети,
Шаманы, блокады,
Да всё на свете!
`,
};

export default song;
