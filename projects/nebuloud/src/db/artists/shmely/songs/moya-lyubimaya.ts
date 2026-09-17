import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.moyaLyubimaya,
  name: ['Моя любимая'],
  albums: [EnumAlbums.spazmyRoka],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Бог мёртв когда ты рядом
День, ночь за твоим взглядом
Жизнь - мрак когда не слышу
Шепот, крик что губит крышу

Тень твоя затмила звезды, а дыханье - грех безумия!
Без тебя мне невозможно, ты моя любимая!
Ты дашь мне бешеный кайф...

Ты можешь быть и скрыться
Режут плоть твои ресницы
Королева, ты богиня
Не будь тебя - планета сгинет!
`,
};

export default song;
