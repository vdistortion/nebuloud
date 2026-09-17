import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.chuzhoi,
  name: ['Чужой'],
  albums: [EnumAlbums.ostanoviteChelovechestvo, EnumAlbums.vosstanoviteChelovechestvo],
  authors: 'Шмель',
  text: `
Я спускался на землю снегом
Я рвался в души и сны
Я желал стать человеком
Но на пути встала ты

Я подарил тебе плоть и душу
Но не учёл лишь один изъян
Что человеку никто не нужен
Ему лишь нужен один он сам

Я чужой, чужой, чужой...
Чужой, чужой, чужой...

Теперь дорога одна на свалку
Больных страстей и просроченных чувств
И я брожу по полю где-то вразвалку
Я безупречен, а значит - пуст

Я чужой, чужой, чужой...
Чужой, чужой, чужой...
`,
};

export default song;
