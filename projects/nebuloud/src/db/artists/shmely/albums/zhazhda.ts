import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.zhazhda,
  name: 'Жажда',
  year: 2004,
  folder: '/artist/shmely/albums/2004_zh.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79310' },
  songs: [
    EnumSongs.zhazhda,
    [EnumSongs.dorogaya, { name: ['Дорогая (очень ранняя)'] }],
    EnumSongs.sera,
    [EnumSongs.denRozhdeniya, { name: ['День рождения (застольная)'] }],
    [EnumSongs.trudniiRebyonok, { name: ['Трудный ребёнок (школьная)'] }],
    [EnumSongs.yaNeAngel, { name: ['Я не ангел (другая версия)'] }],
    [EnumSongs.diskoteka, { name: ['Дискотека (очень ранняя)'] }],
    [EnumSongs.yaObernusOgnyom, { name: ['Я обернусь огнём (другая версия)'] }],
    EnumSongs.korobas,
    EnumSongs.megapolis,
    EnumSongs.valsVlyublyonnikhVoln,
  ],
  info: `
Внеплановый альбом (тираж 100 шт.).
Альбом записан на студии ”Ska'n'Dall” г. Ровно. 2004 г.

Некоторые песни отредактированны на студии ”ШМ”

Инструменты - Алексей Казанцев.


"В этот альбом вошли песни очень ранние, застольные, другие версии уже издаваемых ранее и новые..."
  `,
};

export default album;
