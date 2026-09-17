import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.lyod,
  name: 'Лёд',
  year: 2005,
  folder: '/artist/shmely/albums/2005_lyod.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/5pL8KLhjDalWkja1X7dKz9',
    amazonMusic: 'https://music.amazon.com/albums/B0949PDJW3',
    soundcloud: 'https://soundcloud.com/shmieli/sets/svbatmtebutf',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_lNKOLD4k7WdPQm4mG-38CMnTtmV_Dd-rc',
    yandexMusic: 'https://music.yandex.ru/album/79313',
  },
  songs: [
    EnumSongs.osinoviiKol,
    EnumSongs.zhenshchinaPtitsa,
    EnumSongs.solntseMoyo,
    EnumSongs.lyubov,
    EnumSongs.povelitelnitsaSnov,
    EnumSongs.idi,
    EnumSongs.polin,
    EnumSongs.lyod,
    EnumSongs.shutka,
    EnumSongs.chyornayaVolga,
    EnumSongs.naTomSveteMiVstretimsyaVnov,
    EnumSongs.ognennieSlyoziGieni,
    EnumSongs.davitNebo,
  ],
  info: `
Лёс (Лёля) - вокал, музыка; Шмель (Александр) - вокал, бас, музыка, тексты; Росс (Ростислав) - клавиши, синтезаторы, бэк-вокал; Базилио (Игорь) - гитара, бэк-вокал; Мартын (Андрей) - барабаны.
Альбом записан на студии ”Shmely rec.” и на студии фирмы ”Тенип” (095) 963-71-49. Сведение и мастеринг - Ростислав Щербатко (Росс).
В записи приняли участие: Алексей Ермаков - запись некоторых вокалов и двух песен; Валентина Козлова - балалайка; Олега Туртыгин - гитара; Алексей Казанцев - гитара, бас, запись.
  `,
};

export default album;
