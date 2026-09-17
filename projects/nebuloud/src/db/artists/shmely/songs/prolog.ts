import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.prolog,
  name: ['Пролог'],
  albums: [EnumAlbums.prishelcyVetotMir],
  authors: 'Alan Waters - Эрика Кеслер',
  text: `
И я сниму противогаз, но лишь на миг,
Что бы вдохнуть прогорклый воздух, пыль и гарь.
Как жаль, что нет сегодня рядом их;
Тех, кто так просто уничтожил этот рай!
`,
};

export default song;
