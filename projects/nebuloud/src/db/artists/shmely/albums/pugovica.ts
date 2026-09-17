import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.pugovica,
  name: 'Пуговица',
  year: 2006,
  folder: '/artist/shmely/albums/2006_pugovica.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79314' },
  songs: [
    EnumSongs.intro,
    EnumSongs.pugovitsa,
    EnumSongs.angel13,
    EnumSongs.striptizIntellekta,
    EnumSongs.zhenshchinaDramaturgiya,
    EnumSongs.megapolis,
    EnumSongs.gilotina,
    EnumSongs.zver,
    EnumSongs.renessans,
    EnumSongs.antiromantika,
    EnumSongs.khoditChyornayaKoroleva,
    EnumSongs.valsVlyublyonnikhVoln,
    EnumSongs.katyonka,
    EnumSongs.mirKomediya,
    EnumSongs.sudorogi,
  ],
  info: `
Сольный альбом Лёса и Шмеля ПУГОВИЦА
Изначально этот альбом планировался как акустический. Но в процессе записи концепция была изменена. В него вошли также песни проекта Lyolya & Shmel'. В последствии в ходе работы, а также в создании большинства песен принял участие Alan Waters. Так что этот альбом вполне можно считать следующей совместной работой ШМ и AW, если не брать в счёт несколько изначально записанных песен.
  `,
};

export default album;
