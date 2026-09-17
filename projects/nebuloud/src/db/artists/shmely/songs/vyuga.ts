import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.vyuga,
  name: ['Вьюга'],
  albums: [
    EnumAlbums.petlyaSoblazna,
    EnumAlbums.trahniNebo,
    EnumAlbums.vethijSbornik,
    EnumAlbums.yaVernusKTebe,
  ],
  authors: 'Шмель',
  text: `
Ветер чужой, пропитанный огнём,
Свет, заражённый тревогой,
Храм святой, пронизанный мечом,
И судеб оборванных дорога

Вьюгой замело ратное полюшко,
Да пронзит копьём скорбная долюшка
Вьюгой замело милого оченьки,
Разложили крестики смертушки-доченьки так жадно…

Пепел и стон, разбитая мечта,
Кипит, бурлит слепая злоба,
Не в рай, а в ад всех привела,
И судеб оборванных дорога

А по утру летали ангелы,
Собрали душ так много,
Не уйти им из гаснущей жары,
И судеб изорванных дорогой
`,
};

export default song;
