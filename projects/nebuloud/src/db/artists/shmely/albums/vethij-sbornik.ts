import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.vethijSbornik,
  name: 'Ветхий сборник',
  year: 2001,
  folder: '/artist/shmely/albums/2005_vs.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79303' },
  songs: [
    EnumSongs.pomolis,
    EnumSongs.uHaiu,
    EnumSongs.krizhanaVoda,
    EnumSongs.dyvo,
    { name: 'Веснянка' },
    EnumSongs.misiats,
    { name: 'О-О-О' },
    EnumSongs.kakNaPlakheSvyatoi,
    { name: 'Смерть' },
    EnumSongs.vyuga,
    EnumSongs.dunia,
    { name: 'Шуловье' },
    EnumSongs.psikhoz,
    EnumSongs.spazmiRoka,
    EnumSongs.zavitai,
    EnumSongs.obessilenniiPrakh,
    EnumSongs.saprofag,
  ],
};

export default album;
