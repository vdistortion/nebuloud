import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.sPetlyoiNaShee,
  name: ['С петлёй на шее'],
  albums: [EnumAlbums.sPetlyojNaShee],
  authors: 'Андрей Большаков — Нина Кокорева',
  text: `
Все надежды мои - дым,
Снова, лозунги нагло врут:
"Коммунизм - непобедим!"
И "Превыше всего - труд!"
Песня самая лучшая - гимн,
Миша - лучшее из имен.
Я не знаю, как тем, другим -
Мне бы карточку у знамен.
Панацея от всех бед
Пятилетку в три года чтоб!
Дивидендов в помине нет,
Перспектива моя - гроб!
`,
};

export default song;
