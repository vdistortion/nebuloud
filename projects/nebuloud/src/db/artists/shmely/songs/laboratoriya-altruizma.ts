import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.laboratoriyaAltruizma,
  name: ['Лаборатория альтруизма'],
  albums: [
    EnumAlbums.moshchi,
    EnumAlbums.organizm,
    EnumAlbums.risunkiNaDushe,
    EnumAlbums.agressivnyjPokoj,
    EnumAlbums.polnaSuma,
    EnumAlbums.yaVernusKTebe,
  ],
  authors: 'Шмель',
  text: `
На слащавом лице учёного
Электрошок застыл навеки,
Грудка бровей, кучка губ,
Да смотрит искренне, словно труп!

Смена крупная, наука хитрая,
По пробиркам любовь и ненависть
Недоступна, его мысль недоступная,
Чем-то он напоминает всевышнего!

Лаборатория (x3)
Альтруизма!

Все в порядке лежит на полочках,
Пахнет счастьем и вечной радостью,
Только вот не удаётся опыт,
А подопытных всё меньше...

Тухнут фонарики, тухнут красиво,
Словно сердечки Святого Валентина
Тухнут фонарики, тухнут красиво,
Словно сердечки Святого Валентина!
`,
};

export default song;
