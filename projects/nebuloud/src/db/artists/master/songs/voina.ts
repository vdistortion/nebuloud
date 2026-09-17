import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.voina,
  name: ['Война'],
  albums: [EnumAlbums.sPetlyojNaShee],
  authors: 'Сергей Попов — Николай Глазков',
  text: `
Haм опять угрожает война,
А ей мы проклятья кричим.
Война - это подвиги и ордена
Война - это подвиг для лжи!

Война преждевременно старит сердца
И губит в нас людей.
А стоит убить одного дурака -
Платить миллионы рублей!

Нет!
`,
};

export default song;
