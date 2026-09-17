import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.vperedi,
  name: ['Впереди'],
  albums: [EnumAlbums.vosemZhenshchinNaRaduge, EnumAlbums.sbornik],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Сквозь вены туч проникает
Отчаянный лунный покой
Улетая, забери меня с собой
Жертву плоти земной

Впереди необъятные земли
Ты лети, ты лети
Стать хотел богом любви,
А стал ангелом смерти

Под стон крестов безымянных
В огне бездыханных страстей
Вспоминаю грешный мир твоих затей
Возвращайся скорей
`,
};

export default song;
