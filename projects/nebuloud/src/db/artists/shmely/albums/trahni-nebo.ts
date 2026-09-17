import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.trahniNebo,
  name: 'Трахни небо',
  year: 2000,
  folder: '/artist/shmely/albums/2000_nebo.jpg',
  songs: [
    EnumSongs.laiIllyuzii,
    EnumSongs.vyuga,
    EnumSongs.psikhoz,
    [EnumSongs.solnishkoViidet, { name: ['Солнышко'] }],
    EnumSongs.tulovishchej,
    EnumSongs.kakNaPlakheSvyatoi,
    { name: 'Ганьба' },
    EnumSongs.alliluia,
    EnumSongs.raspyatie,
    EnumSongs.trahniNebo,
    EnumSongs.divchinaKulya,
    [EnumSongs.zavitai, { name: ['Завiтай зачiкай'] }],
    EnumSongs.fashistskiiMototsikl,
    EnumSongs.travi,
  ],
};

export default album;
