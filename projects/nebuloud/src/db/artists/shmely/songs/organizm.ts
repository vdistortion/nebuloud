import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.organizm,
  name: ['Организм'],
  albums: [EnumAlbums.organizm],
  authors: 'Шмель',
  text: `
Мы с тобой всегда были рядом
Даже если будет больно
Если долг невероятно
Я приду к тебе невольно

Организм, твой организм!
Краса мира, твой организм!

Ведь с тобою слов не надо
Запрягу тебя мечтою
Ты - спасенье, ты - награда
Сок любви, тебя закрою
`,
};

export default song;
