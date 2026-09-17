import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.princessaBezTrusov,
  name: 'Принцесса без трусов',
  year: 2000,
  folder: '/artist/shmely/albums/2000_prinzessa.jpg',
  songs: [
    EnumSongs.printsessaBezTrusov,
    EnumSongs.izvrashchenieIRazvrat,
    EnumSongs.kronos,
    EnumSongs.ivaStishok,
    EnumSongs.yaObernusOgnyom,
    EnumSongs.rzhaviiKiborg,
    { name: 'Шуловье' },
    EnumSongs.poebenTrava,
    EnumSongs.yeshchyoStishok,
    { name: 'Зомби-буги' },
    EnumSongs.poMaslu,
    EnumSongs.molodilniiSok,
    EnumSongs.tsveti,
    EnumSongs.stishochek,
    { name: 'Патология' },
    EnumSongs.zarevo,
    EnumSongs.pankDiktatura,
    EnumSongs.krakhIGibel,
    EnumSongs.gruzovikUbiitsa,
  ],
};

export default album;
