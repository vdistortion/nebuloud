import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

export const album: TypeAlbum = {
  id: EnumAlbums.pochtiFantastika,
  name: 'Почти фантастика',
  year: 2014,
  folder: '/artist/mc18/albums/ab67616d0000b273c64cc4db593a84c76d25f9c6.webp',
  songs: [
    EnumSongs.zdesIsejchas,
    { name: 'Планета Ждет Героев (при уч. DJ Prosha)' },
    EnumSongs.pochtiFantastika,
    { name: 'Пока Вращаются Протекторы (при уч. Красное Дерево)' },
    { name: 'Ледяной Воздух' },
    { name: 'Я "я" (Кен Уилбер "Космическое Сознание)' },
    { name: 'Метроном' },
    { name: 'Волны' },
    { name: 'Раскаленное Железо (к/ф "Танец Дели")' },
    { name: 'Вглядываясь вверх (при уч. Бьяча, Гена Гром и Lenar)' },
    { name: 'Поединок Шредингера (т/с "Семья Сопрано")' },
    { name: 'Частицы (при уч. Грот)' },
    { name: 'Дефрагментация (при уч. 25/17)' },
    { name: 'Точка Фокуса (при уч. Trilogy Soldiers)' },
    { name: 'Тонкие Спицы' },
    { name: 'Слепое Пятно (т/п "Суть и Присутствие")' },
    EnumSongs.dom,
    { name: 'Фломастеры' },
  ],
  info: `
  `,
};
