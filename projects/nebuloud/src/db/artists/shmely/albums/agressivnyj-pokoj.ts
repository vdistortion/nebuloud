import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.agressivnyjPokoj,
  name: 'Агрессивный покой',
  year: 2002,
  folder: '/artist/shmely/albums/2002_pokoy.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79305' },
  songs: [
    EnumSongs.bol,
    EnumSongs.tiSnegVMoeiPreispodnei,
    EnumSongs.agressivniiPokoi,
    EnumSongs.theFirstLove,
    [EnumSongs.pogadai, { name: ['Погадай (new version)'] }],
    [EnumSongs.risunkiNaDushe, { name: ['Рисунки на душе (new version)'] }],
    [EnumSongs.iskushenie, { name: ['Искушение (1999)'] }],
    EnumSongs.blagodat,
    EnumSongs.maneken,
    [EnumSongs.laboratoriyaAltruizma, { name: ['Лаборатория альтруизма (new version)'] }],
    EnumSongs.denSvyatogoValentina,
    EnumSongs.otravlennieBogi,
    [EnumSongs.slyoznaya, { name: ['Слёзная (remix)'] }],
    [EnumSongs.cherezKrai, { name: ['Либо (remix)'] }],
    [EnumSongs.groza, { name: ['Гроза (remix)'] }],
    [EnumSongs.zamokIzTuch, { name: ['Волшебный замок (live 1999)'] }],
    [EnumSongs.lakaiOtravu, { name: ['Лакай отраву (live 1999)'] }],
  ],
  info: `Альбом "Агрессивный покой" является переходным альбомом, к совершенно новому альбому.
Это объясняется тем, что кроме новых песен в нём будут помещены три древних песни 1999 года,
которые никогда не выходили в Москве, и несколько ремиксов на песни альбома "Негатив пространства",
которые сделал наш клавишник Росс, также некоторые новые версии песен из альбома "Рисунки на душе" - Клочья.

”SHMELY RECORDS”`,
};

export default album;
