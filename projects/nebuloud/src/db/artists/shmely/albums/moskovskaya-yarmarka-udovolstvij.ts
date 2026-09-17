import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.moskovskayaYarmarkaUdovolstvij,
  name: 'Московская ярмарка удовольствий',
  year: 2009,
  folder: '/artist/shmely/albums/2009_myau.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/0wzOwUeEa3fVPI77pJRK8E',
    soundcloud: 'https://soundcloud.com/shmieli/sets/sjsqz6kbrsva',
    youtubeMusic:
      'https://music.youtube.com/playlist?list=OLAK5uy_nH21z5pDqYVpk4W06KePL0KE-pMCeRVCw',
    yandexMusic: 'https://music.yandex.ru/album/3444131',
  },
  songs: [
    EnumSongs.vseDengiKonchilis,
    EnumSongs.devochkaSChyornimiBantikami,
    EnumSongs.zhenshchinaTen,
    EnumSongs.zhyoludi,
    EnumSongs.lyubovIzStekla,
    EnumSongs.laska,
    EnumSongs.krizis,
    EnumSongs.moskovskayaYarmarkaUdovolstvii,
    EnumSongs.pir,
    { name: 'Две столицы' },
    { name: 'Брюхо' },
    EnumSongs.zoya,
    [EnumSongs.gde, { name: ['Где? (bonus track)'] }],
    [EnumSongs.sNovimGodom, { name: ['С Новым годом (bonus track)'] }],
    [EnumSongs.mlechnayaDepressiya, { name: ['Млечная депрессия (bonus track)'] }],
  ],
};

export default album;
