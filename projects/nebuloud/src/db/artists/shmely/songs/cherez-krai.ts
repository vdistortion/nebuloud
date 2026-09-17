import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.cherezKrai,
  name: ['Через край'],
  albums: [EnumAlbums.negativProstranstva, EnumAlbums.agressivnyjPokoj],
  authors: 'Шмель',
  text: `
Эх, свобода сладкая
Эх, природа мать
Закрывайтесь по домам
Мы идём гулять

Либо через край
Либо не хватает
Либо прямо в рай
Либо закрывает

Будет пьяный-пьяный дождь
Будет страстный миг
Мы с тобой ещё не раз напьёмся
Не грусти старик

Жизнь проходит, как кино
Но жизнь идёт не зря
Как бы не старался он
Жизнь я люблю лишь тебя
`,
};

export default song;
