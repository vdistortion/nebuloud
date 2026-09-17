import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.bioMotor,
  name: ['Био-мотор'],
  albums: [EnumAlbums.ostanoviteChelovechestvo, EnumAlbums.vosstanoviteChelovechestvo],
  authors: 'Шмель',
  text: `
Ласка металла, ласка металла
Сладость дыма, сладость дыма
Ласка металла, ласка металла
Живая машина

Биомотор
Вершина миросовершенства
Вечный мотор…

Грация силы, грация силы
Безупречность движений
Грация силы, грация силы
Страсть прикосновений…
`,
};

export default song;
