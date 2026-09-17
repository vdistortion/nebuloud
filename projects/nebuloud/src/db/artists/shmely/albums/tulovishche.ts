import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.tulovishche,
  name: 'Туловище',
  year: 1998,
  folder: '/artist/shmely/albums/1998_tulovishe.jpg',
  songs: [
    EnumSongs.neboStikh,
    EnumSongs.zhelezniiBog,
    EnumSongs.laiIllyuzii,
    EnumSongs.travi,
    EnumSongs.pervayaLyubovStikh,
    EnumSongs.tulovishchej,
    {
      name: 'Экзотика',
    },
    EnumSongs.gniloeOzero,
    EnumSongs.zhaloBeiSavalyai,
    EnumSongs.lahidno,
    EnumSongs.raspyatie,
    EnumSongs.korabliki,
    {
      name: 'Ветер и гром',
    },
    EnumSongs.neputyoviiAvtobus,
    {
      name: 'Мясной вопрос',
    },
    EnumSongs.gimnopodobnaya,
  ],
};

export default album;
