import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.zarevo,
  name: ['Зарево'],
  albums: [EnumAlbums.princessaBezTrusov],
  authors: 'Шмель',
  text: `
Ой, да б не ходила девка там,
Ой, да б не звала любого,
Как из пластилиновых туч вышел демон и взял её.

Зарево, зарево!
Зарево на груди!
Зарево, зарево!
Люби, люби, люби...
Его, его, его, его!

Ой, да б не страдала девка,
Ой, да б не пускала слёз,
Когда в парафиновых грёзах пропал её демон.

Зарево, зарево,
Зарево в голове.
Зарево, зарево.
Прижми его к себе!
`,
};

export default song;
