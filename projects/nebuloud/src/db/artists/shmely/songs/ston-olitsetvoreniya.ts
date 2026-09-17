import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.stonOlitsetvoreniya,
  name: ['Стон олицетворения'],
  albums: [EnumAlbums.vosemZhenshchinNaRaduge],
  authors: 'Шмель',
  text: `
Звёзды падали в яму
Сердце скрылось за золотом
Птицы бились упрямо
В окна города
Безымянные драммы
Сны как трагикомедии
С рук единственной мамы
Испить столетия

Стон олицетворения
Двери параллельных миров, миров

Всех покинули тени
Лишь обнажённые мнения
От людей-привидений
Отражения...
`,
};

export default song;
