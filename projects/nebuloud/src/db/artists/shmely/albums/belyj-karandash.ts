import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.belyjKarandash,
  name: 'Белый карандаш',
  year: 2014,
  folder: '/artist/shmely/albums/2014_karandash.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/4BKbUBCtcHXI55rIgRK1N2',
    soundcloud: 'https://soundcloud.com/shmieli/sets/nrfb3fkhuf2y',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_liI8wzWEd8L3cCk0h6iXOxEnakMSfvEz8',
    yandexMusic: 'https://music.yandex.ru/album/3444125',
  },
  songs: [
    EnumSongs.serdtseBoga,
    EnumSongs.beliiKarandash,
    EnumSongs.seiChas,
    EnumSongs.podAsfalt,
    EnumSongs.bezotvetnayaLyubov,
    EnumSongs.vselenskiiOrgazm,
    EnumSongs.kabare,
    EnumSongs.potekha,
    EnumSongs.napoiNas,
    EnumSongs.poputchitsa,
    EnumSongs.drugoiSmekh,
    EnumSongs.okeanomagiya,
    EnumSongs.pilayushchiiAngel,
    EnumSongs.netVibora,
    EnumSongs.andromeda,
  ],
};

export default album;
