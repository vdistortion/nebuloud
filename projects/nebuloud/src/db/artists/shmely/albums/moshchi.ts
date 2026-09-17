import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.moshchi,
  name: 'Мощи',
  year: 2000,
  folder: '/artist/shmely/albums/2000_moshi.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/1xaIDZcBZLaXtnrsfg1Tbr',
    soundcloud: 'https://soundcloud.com/shmieli/sets/jdd1cnp6e3hy',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_mGUbrFjlAsspY8eHWwTpWm_7DAB7C5J1s',
    yandexMusic: 'https://music.yandex.ru/album/3444130',
  },
  songs: [
    { name: 'Крыша горит' },
    EnumSongs.sizoblyudov,
    { name: 'Эпидемия Ха' },
    EnumSongs.laboratoriyaAltruizma,
    EnumSongs.ivolga,
    EnumSongs.prostitutkaVampir,
    EnumSongs.vMyasnomTsekhuPrazdnikDushi,
    { name: 'Клякса' },
    EnumSongs.fabrikaFekalii,
    { name: 'Лукавый суицид' },
    { name: 'Падаль' },
    { name: 'Атеист' },
    { name: 'Радиактивные отходы' },
    { name: 'Мастурбатор' },
    { name: 'Сизоблюдов и Камнеблядов' },
  ],
  info: `
Вот что говорят Шмели:

"Альбом Мощи, записан где-то в 1999 г. или в начале 2000 г. (не помним), за неделю-две, вдвоём. Альбом писался не в самое лучшее наше творческое настроение... Как помнится, хотелось сделать на зло (неизвестно кому) ужасный альбом, Один из них - "Злорадостная опухоль", а это, так сказать его последователь. По разным причинам сами мы его слушать не можем. Думаем он будет интересен только истинным фанатам. Некоторые песни из него уже были в сборниках. Название песен восстановили по памяти, возможны расхождения с первоначальными. Эта версия ещё неотмастерённая почти, поэтому звучит тихо".
  `,
};

export default album;
