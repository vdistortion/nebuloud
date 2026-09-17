import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.ostanoviteChelovechestvo,
  name: 'Остановите человечество',
  year: 2003,
  folder: '/artist/shmely/albums/2003_ostanovite.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79308' },
  songs: [
    EnumSongs.aistNadInkubatorom,
    EnumSongs.yaVsyoNarushil,
    EnumSongs.vKlochya,
    EnumSongs.chuzhoi,
    EnumSongs.shans,
    EnumSongs.krasota,
    EnumSongs.naMogileLyubvi,
    EnumSongs.bioMotor,
    EnumSongs.otkroveniya,
    EnumSongs.netVibora,
    EnumSongs.prorvyomsya,
    EnumSongs.golosPalach,
    EnumSongs.on,
    EnumSongs.ostanoviteChelovechestvo,
    EnumSongs.moiPut,
    EnumSongs.vzglyadIznutri,
  ],
};

export default album;
