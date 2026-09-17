import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.durackiyeKnizhki,
  name: 'Дурацкие книжки',
  year: 1998,
  folder: '/artist/shmely/albums/1998_knizhki.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/63sm3EX7I90qTqXEFBcUdT',
    soundcloud: 'https://soundcloud.com/shmieli/sets/iwxkc69m2qc3',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_l16b-hVl6mCOISWOuLJWtDPH5uTbbBoG4',
    yandexMusic: 'https://music.yandex.ru/album/3444884',
  },
  songs: [
    EnumSongs.yaNeAngel,
    EnumSongs.mogilshchik,
    EnumSongs.volosy,
    EnumSongs.zhratPodano,
    EnumSongs.goriKostyor,
    EnumSongs.rezinovieDebri,
    {
      name: 'Язва на душе',
    },
    EnumSongs.duratskieKnizhki,
    {
      name: 'Говно',
    },
    EnumSongs.neGrustiITakKhuyovo,
    {
      name: 'Пьяные облака',
    },
    EnumSongs.ikona,
    EnumSongs.otkroveniya,
    [
      EnumSongs.misiats,
      {
        name: ['Мiсяцъ з неба геть'],
      },
    ],
    EnumSongs.dorogaya,
    {
      name: 'Руйнется мозок',
    },
    {
      name: 'Вакханалия',
    },
  ],
};

export default album;
