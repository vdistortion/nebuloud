import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.novayaReligiya,
  name: ['Новая религия'],
  albums: [EnumAlbums.spazmyRoka, EnumAlbums.poshmelye],
  authors: 'Шмель, Лёс - Шмель',
  duration: 183,
  text: `
Человеческое тесто,
Ритуальная невеста,
Облизало свято место,
Кровью полилась на крест да...

Новая библия,
Модная религия...

Высший суд нас не осудит,
Высшего суда не будет.
Если б были души в теле,
Их давно б все отымели.
`,
};

export default song;
