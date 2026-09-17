import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.melankholiya,
  name: ['Меланхолия'],
  albums: [EnumAlbums.toplivo],
  authors: '',
  text: `
Сон, как смерть - безответное чувство,
Живое искусство без цвета краски.
Наблюдать, непрерывно гаснуть,
Все напрасно, все напрасно...

Меланхолия, приходи ко мне.
Меланхолия, я убью тебя в себе.

Вздыхать и резать себя без пощады,
Цвета ада, кровавые краски.
Может стоит сказать лишь слово,
Волшебное слово без всякой маски.
`,
};

export default song;
