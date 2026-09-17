import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.glotokOgnya,
  name: ['Глоток огня'],
  albums: [EnumAlbums.zhizni33],
  authors: 'Алексей Страйк',
  text: `
Одинокий крест…
Горная река…
Словно души,
В небе облака…

Обрести покой
На чужой земле,
Как здесь выжить,
Если всё в огне.

Глоток огня
Пьёт земля - боль моя.
Глоток огня, глоток огня.

Мокрая трава…
Кисть рябины… кровь
Каплей бурой
Красит землю вновь.

Где твой лучший друг?
Встал с другими в ряд?
Крик последний
Горы повторят.
`,
};

export default song;
