import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.zhenshchinaVSerom,
  name: ['Женщина в сером'],
  albums: [EnumAlbums.karamelnyyeStrahi],
  authors: 'Шмель',
  text: `
Между семи дорог,
И в холод, и в зной, лишь свет,
Каждое утро в срок,
Приходит она на миг,
Оглянулся, её уже нет.

Вечерами она – женщина в сером,
Утром, выпив вина, берётся за дело.
Продавщица воздушных шариков –
Жрица цветных фонариков немой любви.

Но кто пересёкся с ней
Одним всего лишь взглядом,
Тот до последних дней
Воздушным шариком над ней
Кружить будет рядом.
`,
};

export default song;
