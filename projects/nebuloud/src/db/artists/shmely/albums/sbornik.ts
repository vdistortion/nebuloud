import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.sbornik,
  name: 'Сборник 2002-2008',
  year: 2008,
  folder: '/artist/shmely/albums/2008_sbornik.jpg',
  songs: [
    EnumSongs.slyoznaya,
    EnumSongs.solntseVampira,
    EnumSongs.vosemZhenshchinNaRaduge,
    EnumSongs.polnolunie,
    EnumSongs.pokhoroniLyubvi,
    EnumSongs.vperedi,
    EnumSongs.khoditChyornayaKoroleva,
    EnumSongs.zhenshchinaDramaturgiya,
    EnumSongs.tma,
    EnumSongs.volchyaYagoda,
    EnumSongs.drama,
    EnumSongs.evakuator,
    EnumSongs.dramaturgiya,
    EnumSongs.smertObida,
    EnumSongs.lyubov,
    EnumSongs.pryotTakPri,
  ],
};

export default album;
