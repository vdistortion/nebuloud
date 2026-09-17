import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.pir,
  name: ['Пир'],
  albums: [EnumAlbums.moskovskayaYarmarkaUdovolstvij],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Искушая свою душу на холодном огне
Я пришел тебя кушать извне

Белые бабочки на сочной крови
Моего любимого, и ты заходи

На пир на весь мир
Мы мертвы, но растут наши когти

Нелюбимой игрушкой на оторванных лапках
Собираю себя в охапку

Белые тапочки да бантики
Непрощенный пришёл, и ты заходи

На пир на весь мир
Мы мертвы, но растут наши когти
`,
};

export default song;
