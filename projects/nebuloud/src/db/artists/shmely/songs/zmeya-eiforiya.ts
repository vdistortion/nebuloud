import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.zmeyaEiforiya,
  name: ['Змея эйфория'],
  albums: [EnumAlbums.karamelnyyeStrahi],
  authors: 'Шмель',
  text: `
Пляшет копоть, сохнет мёд,
Кого полюбишь, тот умрёт.
Ложь в слезах растает,
Пёс огнём залает.

Панихида, змея-эйфория. Сон.

Крысоловка не спасёт,
Призрак по следам идёт.
Крысы будут рядом.
После всех обрядов.

Ноты – пули, песня – кровь
Льётся, льётся вновь и вновь.
Время без начала.
Пристань без причала.
`,
};

export default song;
