import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.otkroveniya,
  name: ['Откровения'],
  albums: [
    EnumAlbums.durackiyeKnizhki,
    EnumAlbums.ostanoviteChelovechestvo,
    EnumAlbums.vosstanoviteChelovechestvo,
  ],
  text: `
Выйди, Лихо сватать зиму,
Выведи воссватать ночь.
Встань огонь пред вратами в рай!
Там сестра-проказа - божья ночь

Закопали боль под землю,
А я ночью её полью.
Чем пугали, то познали,
Когда писали Библию!

Откровения с неба падали
В святой крови.
Откровения, как горошины
На клыках твоих.
Миф
Миф
Миф
Жив!

Откровения с неба падали
В святой крови.
Откровения, как горошины
На клыках твоих.

Откровения с неба падали
В святой крови.
Откровения, как горошины
На клыках твоих.
Миф
Миф
Миф
Жив!
`,
};

export default song;
