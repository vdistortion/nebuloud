import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.laRencontre,
  name: ['La Rencontre'],
  albums: [EnumAlbums.koshkinyObidy],
  authors: 'Шмель - Шмель, Steve Love',
  clipYouTubeId: 'cvZqR9-o1C0',
  text: `
И золотой пылью станут острые камни
Жизнь светом манит, когда сердце жжёт
Сказка будет былью, откроются грозные ставни
Мечта не обманет, любовь сбережёт
`,
};

export default song;
