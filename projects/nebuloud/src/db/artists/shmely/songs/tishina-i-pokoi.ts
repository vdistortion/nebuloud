import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.tishinaIPokoi,
  name: ['Тишина и покой'],
  albums: [EnumAlbums.bombaVUbezhishche, EnumAlbums.polnaSuma, EnumAlbums.byuroVolshebnikhUslug],
  authors: '',
  text: `
Приходил нежданный гость
Приносил печаль в корзинке
Остаётся слиться с краской
Там заряд цветной картинки

ПРИПЕВ:
Покой...
Покой...
Покой...
Тишина и покой...

Посетил забавный дух
Раскопав душевный бункер
Не заманит светом - значит
Оставаться на рисунке

ПРИПЕВ

Пробирался по следам
Злой и жалобный подарок
Но не исправит он никогда
На картине всех помарок

ПРИПЕВ (X2)
`,
};

export default song;
