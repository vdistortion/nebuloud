import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.karamelnyyeStrahi,
  name: 'Карамельные страхи',
  year: 2008,
  folder: '/artist/shmely/albums/2008_strahi.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/7biUa81AdYs3MZ44VKMJXr',
    soundcloud: 'https://soundcloud.com/shmieli/sets/yzvnvdnwl0ar',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nXeF2ClIBVJ0TsyEbRNV7FoJFjjtssJUY',
    yandexMusic: 'https://music.yandex.ru/album/3444127',
  },
  songs: [
    EnumSongs.zhenshchinaVSerom,
    EnumSongs.svadbiNeBudet,
    EnumSongs.mama,
    EnumSongs.nespokoinieSniStikh,
    EnumSongs.kolibelnaya,
    EnumSongs.karamelnieStrakhi,
    EnumSongs.rani,
    EnumSongs.yaTebyaLyublyu,
    EnumSongs.zmeyaEiforiya,
    EnumSongs.yaBuduZhit,
    EnumSongs.nervi,
    EnumSongs.lirika,
    [EnumSongs.tsvetDozhdya, { name: ['Цвет дождя (bonus track)'] }],
    [EnumSongs.vZhivikhIgrayutMertvetsi, { name: ['В живых играют мертвецы (bonus track)'] }],
  ],
};

export default album;
