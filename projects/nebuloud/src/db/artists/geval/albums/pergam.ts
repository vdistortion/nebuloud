import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.pergam,
  name: 'Пергам',
  year: 2009,
  folder: '/artist/geval/albums/2.webp',
  songs: [
    EnumSongs.pergam,
    EnumSongs.vojna,
    EnumSongs.armageddon,
    EnumSongs.slepcy,
    EnumSongs.dzhihad,
    EnumSongs.salomeya,
    EnumSongs.vakhanaliya,
    EnumSongs.epitafiya,
    EnumSongs.podNatiskom,
    EnumSongs.skulptor,
    EnumSongs.quoVadis,
    EnumSongs.gryaznyjHleb,
    EnumSongs.iuda,
    EnumSongs.umryomZhivymi,
  ],
  info: `
Лейбл Dizzaster
  `,
};

export default album;
