import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.lisayaGora,
  name: ['Лысая гора'],
  albums: [EnumAlbums.neboProtiv, EnumAlbums.mekhanicheskayaBalerina],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Кто по сюжету - игрок?
Что по приметам - беда?
Что по завету - порок? -
Война.
На что меняли покой?
Куда упала звезда?
Куда спешит за Землёй
Луна, Луна?

Кто в себя, кто в никуда,
Кто в гламур, а кто на глянец.
Вся планета - Лысая Гора,
Жизнь - бесстыдный грешный танец.

Без промедления жить,
Без промедления жрать,
Без промедления пить
И не умирать.
Душевней мяса нет,
Духовней мяса свет
И мясу мясо любить,
Без промедления жить.
`,
};

export default song;
