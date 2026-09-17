import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.territoriyaNol,
  name: 'Территория ноль',
  year: 2018,
  folder: '/artist/shmely/albums/2018_territoriyaNol.jpg',
  songs: [
    EnumSongs.bezImyon,
    EnumSongs.banitZhizn,
    EnumSongs.kukolniiDomik,
    EnumSongs.territoriyaNol,
    EnumSongs.solnechniiChyortik,
    EnumSongs.khozyainNePridyot,
    EnumSongs.odinRazVZhizn,
    EnumSongs.liut,
    EnumSongs.transmissiya,
    EnumSongs.shkiraYeLeiba,
    EnumSongs.vDele,
    EnumSongs.seishnVudu,
  ],
};

export default album;
