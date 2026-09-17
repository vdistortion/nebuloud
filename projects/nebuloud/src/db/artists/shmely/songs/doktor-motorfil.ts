import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.doktorMotorfil,
  name: ['Доктор Моторфил'],
  albums: [EnumAlbums.toplivo],
  authors: '',
  text: `
На свалке давно не любимых машин,
Гонимый людьми дедвушка жил,
С металлом погибшим он чудо творил
И новую жизнь моторам дарил.

Моторфил, доктор-моторфил!

Машины за жизнь установили тайком,
Вечный насос в грудь старика,
Чтоб всегда он воскрешал металлолом,
И ездил раз в год встречать рассвет на ГОА.
`,
};

export default song;
