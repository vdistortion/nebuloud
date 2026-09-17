import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.pokhoroniLyubvi,
  name: ['Похороны любви'],
  albums: [EnumAlbums.vosemZhenshchinNaRaduge, EnumAlbums.sbornik],
  authors: 'Шмель',
  text: `
Вот осталась сама на весь мир
Окружила тоска тень мою
Боль изгнала покой
Вместо линий пунктир
Но не буду с тобой, пусть я даже сгорю

Места нет мне в огромной-огромной любви
Моё имя - вселенская тьма
Лунный свет мой погас в объятиях твоих
И не вернётся к тебе никогда

Время жить, но так страшно до слёз
Час испить мне дух всех текил
Или просто одной на машине в мороз
По Москве ночной до потери всех сил
`,
};

export default song;
