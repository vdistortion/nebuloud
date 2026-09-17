import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.tulovishchej,
  name: ['Туловищей'],
  albums: [EnumAlbums.tulovishche, EnumAlbums.trahniNebo, EnumAlbums.risunkiNaDushe],
  authors: 'Шмель',
  text: `
Что за песня без баяна?
Что за счастье без стакана?
Что за юность без прыщей?
Что за души без ту-ту...
Туловищей?

Я раздваиваюсь – нас двое
Я и я, я и я
Я принимаю структуру вещей,
Чтоб не видеть всех ту-ту...
Туловищей!
`,
};

export default song;
