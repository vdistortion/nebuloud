import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.plastikaSna,
  name: ['Пластика сна'],
  albums: [EnumAlbums.vosemZhenshchinNaRaduge],
  authors: 'Шмель',
  text: `
Все стихи, метель, собраны в словесный ад
Для слёз девицы
Убрана постель сотню тысяч лет назад
Не спится
С океанами-волнами
Стать бы яркою молнией
С королевой землёй
Стать бы самим собой

Пластика
Пластика
Пластика
Пластика сна
`,
};

export default song;
