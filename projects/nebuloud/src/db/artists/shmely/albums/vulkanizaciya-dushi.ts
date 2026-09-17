import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.vulkanizaciyaDushi,
  name: 'Вулканизация души',
  year: 1999,
  folder: '/artist/shmely/albums/1999_vd_.jpg',
  songs: [
    EnumSongs.krizhanaVoda,
    { name: 'Веснянка' },
    EnumSongs.uHaiu,
    { name: 'Боги' },
    EnumSongs.pomolis,
    { name: 'О-О-О' },
    EnumSongs.dyvo,
    { name: 'Оргазм' },
    EnumSongs.volosy,
    EnumSongs.misiats,
    EnumSongs.dunia,
    { name: 'Смерть' },
    [EnumSongs.neKhody, { name: ['Вогняна рiка'] }],
    [EnumSongs.zima, { name: ['Играй'] }],
    EnumSongs.chornaDoba,
  ],
};

export default album;
