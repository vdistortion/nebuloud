import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.mekhanicheskayaBalerina,
  name: 'Механическая балерина',
  year: 2010,
  folder: '/artist/shmely/albums/2010_balerina.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/0AoYg8ddVNIoismWBYv7jp',
    soundcloud: 'https://soundcloud.com/shmieli/sets/tmbxlpcjxam4',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_kAfpmxC-5vpT_zMwug5HcuXsnFi4l41bo',
    yandexMusic: 'https://music.yandex.ru/album/3444129',
  },
  songs: [
    EnumSongs.mekhanicheskayaBalerina,
    EnumSongs.lyudi,
    EnumSongs.kakofoniyaSerdets,
    EnumSongs.son,
    EnumSongs.pryotTakPri,
    EnumSongs.zhgi,
    EnumSongs.lisayaGora,
    EnumSongs.neboProtiv,
    EnumSongs.koteikaNaTryokhNozhkakh,
    EnumSongs.snovaProLyubov,
    EnumSongs.tsvetochniiMedved,
    [EnumSongs.kolibelnaya, { name: ['Колыбельная++'] }],
    EnumSongs.aelAua,
    [EnumSongs.zhenshchinaIgra, { name: ['Женщина-игра (bonus track)'] }],
  ],
};

export default album;
