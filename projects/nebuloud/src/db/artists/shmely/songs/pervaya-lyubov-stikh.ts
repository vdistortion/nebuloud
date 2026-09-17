import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.pervayaLyubovStikh,
  name: ['Первая любовь (стих)'],
  albums: [EnumAlbums.tulovishche],
  authors: 'Шмель',
  text: `
Лети, оранжевая граната
От раздражённых хрусталиков глаз
От девственности до разврата
До самых гор, народных масс
Лети, лети, лети, граната
Лети вчера, давно и вновь
Ты неизбежно толстая граната
Как первая любовь!
`,
};

export default song;
