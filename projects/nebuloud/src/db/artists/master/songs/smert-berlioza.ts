import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.smertBerlioza,
  name: ['Смерть Берлиоза'],
  albums: [EnumAlbums.poTuStoronuSna],
  authors: 'Ольга Дзусова — Маргарита Пушкина',
  text: `
Ой, да как мне породниться с полюшком?
Ой, да как бросить в землю зернышко?
`,
};

export default song;
