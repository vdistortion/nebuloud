import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.petlyaSoblazna,
  name: 'Петля соблазна',
  year: 1999,
  folder: '/artist/shmely/albums/1998_ps_.jpg',
  songs: [
    EnumSongs.vyuga,
    EnumSongs.psikhoz,
    EnumSongs.solnishkoViidet,
    EnumSongs.vesnaPokoinitsa,
    EnumSongs.kakNaPlakheSvyatoi,
    {
      name: 'Ганьба',
    },
    EnumSongs.alliluia,
    EnumSongs.obessilenniiPrakh,
    {
      name: 'Бісов гай',
    },
    EnumSongs.trahniNebo,
    EnumSongs.divchinaKulya,
    EnumSongs.zavitai,
    {
      name: 'Чёрная исповедь',
    },
    EnumSongs.fashistskiiMototsikl,
    EnumSongs.ponedelnik,
    {
      name: 'Могилагила',
    },
  ],
};

export default album;
