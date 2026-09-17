import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.divchinaKulya,
  name: ['Дiвчина-куля'],
  albums: [EnumAlbums.petlyaSoblazna, EnumAlbums.trahniNebo],
  authors: 'Шмель',
  clipYouTubeId: 'd7O9aDr7las',
  text: `
Дівчина-куля, не кохай мене
Тільки не кохай
Святий дух тобі сукню пошиє
Тільки не кохай

Смертю займана красуня
Смертю займана краса
Смертю займана красуня
Смертю займана краса

Дівчина-куля, не цілуй мене
Тільки не цілуй
Святий дух тобі хату збудує
Тільки не цілуй
`,
};

export default song;
