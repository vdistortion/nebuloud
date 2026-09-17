import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.purga,
  name: 'Пурга',
  year: 1999,
  folder: '/artist/shmely/albums/1998_purga.jpg',
  songs: [
    EnumSongs.aiDa,
    EnumSongs.groza,
    EnumSongs.toska,
    EnumSongs.lakaiOtravu,
    EnumSongs.iskushenie,
    EnumSongs.tenNeizvestnoiZvezdi,
    EnumSongs.nevesyolayaSkazka,
    {
      name: 'Виртуальный самолёт',
    },
    EnumSongs.barinya,
    EnumSongs.molodaya,
    EnumSongs.lyutijSnig,
    EnumSongs.logovo,
    EnumSongs.braga,
    EnumSongs.zamokIzTuch,
    EnumSongs.voda,
    EnumSongs.gubiYad,
    EnumSongs.budtoSkazka,
  ],
};

export default album;
