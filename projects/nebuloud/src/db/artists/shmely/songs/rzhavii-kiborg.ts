import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.rzhaviiKiborg,
  name: ['Ржавый киборг'],
  albums: [EnumAlbums.princessaBezTrusov],
  authors: 'Шмель',
  text: `
Мчится по дороге в ад
Электронный самокат
За ним кислотная полоса
Синтетический сатана...

Киборг, Киборг...
Киборг, Ржавый...

Кто наперерез пойдёт
Того током он убьёт
Вот...
Кто забросит тайный взгляд
Парализует и будет рад
`,
};

export default song;
