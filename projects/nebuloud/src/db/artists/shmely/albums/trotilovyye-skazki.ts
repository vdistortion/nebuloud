import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.trotilovyyeSkazki,
  name: 'Тротиловые сказки',
  year: 1999,
  folder: '/artist/shmely/albums/1998_skazki.jpg',
  songs: [
    EnumSongs.chornaDoba,
    EnumSongs.yablochkoMyauchilo,
    { name: 'Секс, наркотики, самогон' },
    EnumSongs.lykhomaneMeneNich,
    EnumSongs.adskayaMashina,
    EnumSongs.zima,
    { name: 'За тобою' },
    EnumSongs.neKhody,
    EnumSongs.tsvyntar,
    EnumSongs.orhiia,
    EnumSongs.dajGari,
  ],
};

export default album;
