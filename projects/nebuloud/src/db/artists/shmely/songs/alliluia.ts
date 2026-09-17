import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.alliluia,
  name: ['Аллилуйа'],
  albums: [EnumAlbums.petlyaSoblazna, EnumAlbums.trahniNebo],
  authors: 'Шмель',
  text: `
Индевели церкви, разрыхлялась почва,
Сохли чувства, набухали почки,
Видать не найти нам злата чистого
И не построить город неистовый…

Аллилуйя, аллилуйя, аллилуйя…

Стёрлись лапти колючей проседью,
Словно листья чёрной осенью,
Видать, не топтать нам землю томную,
Но всё ж допьём мы рюмку полную…
`,
};

export default song;
