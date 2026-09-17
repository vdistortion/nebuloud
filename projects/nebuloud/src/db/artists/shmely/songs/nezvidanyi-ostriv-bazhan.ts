import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.nezvidanyiOstrivBazhan,
  name: ['Незвіданий острів бажань'],
  albums: [EnumAlbums.tvarynoiuPoruch],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Темрява руйнується
Минає злива
Диво готується
Самотнє диво!

Незвіданий острів бажань
Маленької душі величезне диво
Незвіданий острів бажань
Правда сумна, мрія вродлива!

Темрява руйнується
Але світла немає
Диво хвилюється
Посуху приймає!

Незвіданий острів бажань
Маленької душі величезне диво
Незвіданий острів бажань
Правда сумна, мрія вродлива!
`,
};

export default song;
