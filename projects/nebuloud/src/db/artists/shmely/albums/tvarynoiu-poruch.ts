import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.tvarynoiuPoruch,
  name: 'Твариною поруч',
  year: 2019,
  folder: '/artist/shmely/albums/2019_tvarynoiuPoruch.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/4y1klyGGyhGlxivN9EXISg',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nrbD3XGHYCF7V3PbsxW0bSSjYhKyyQqF8',
    amazonMusic: 'https://music.amazon.com/albums/B0838NBKG7',
    yandexMusic: 'https://music.yandex.ru/album/10114858/track/63523415',
  },
  songs: [
    EnumSongs.nezvidanyiOstrivBazhan,
    EnumSongs.tvarynoiuPoruch,
    EnumSongs.mriiaZrada,
    EnumSongs.chortPuzar,
    EnumSongs.troiandy,
    EnumSongs.shchodennyk,
    EnumSongs.lykhomaneMeneNich,
    EnumSongs.zaKrai,
    EnumSongs.ochiVorohiv,
    EnumSongs.kryhaPalas,
    EnumSongs.lyutijSnig,
    EnumSongs.nalyvai,
    EnumSongs.stohneYanholiatko,
  ],
};

export default album;
