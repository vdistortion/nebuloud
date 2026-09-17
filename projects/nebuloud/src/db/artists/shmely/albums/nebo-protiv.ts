import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.neboProtiv,
  name: 'Небо против',
  year: 2009,
  folder: '/artist/shmely/albums/2009_nebo-protiv.jpg',
  songs: [
    EnumSongs.zhgi,
    EnumSongs.pryotTakPri,
    EnumSongs.koteikaNaTryokhNozhkakh,
    EnumSongs.snovaProLyubov,
    EnumSongs.neboProtiv,
    EnumSongs.tsvetochniiMedved,
    EnumSongs.lisayaGora,
    [EnumSongs.kolibelnaya, { name: ['Колыбельная++'] }],
    EnumSongs.aelAua,
    { name: 'В 2009 году!' },
    EnumSongs.bisovKutUla,
    { name: 'Доители изнурённых жаб (кавер на песню А.Лаэртского)' },
  ],
};

export default album;
