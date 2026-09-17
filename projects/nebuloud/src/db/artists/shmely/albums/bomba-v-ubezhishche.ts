import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.bombaVUbezhishche,
  name: 'Бомба в убежище',
  year: 2000,
  folder: '/artist/shmely/albums/2000_bomba.jpg',
  songs: [
    EnumSongs.agoniya,
    EnumSongs.tishinaIPokoi,
    EnumSongs.bomLbom,
    [EnumSongs.polnaSuma, { name: ['Безлюдный остров'] }],
    EnumSongs.tulyaremiya,
    { name: 'Вирус' },
    EnumSongs.yaNeAngel,
    { name: 'Вихрь страстей' },
    EnumSongs.sadizm,
    { name: 'Хули пули праху' },
    EnumSongs.trupniePyatna,
    { name: 'Анаконда' },
    { name: 'Борода' },
    EnumSongs.slyoznaya,
    { name: 'Новый год' },
    { name: 'Язва на душе' },
    EnumSongs.zastolnaya,
  ],
};

export default album;
