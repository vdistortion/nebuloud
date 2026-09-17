import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.pesnyaAnnushki,
  name: ['Песня Аннушки'],
  albums: [EnumAlbums.poTuStoronuSna],
  authors: 'Маргарита Пушкина',
  text: `
Ой, да как мне породниться с полюшком?
Ой, да как бросить в землю зернышко?
Чтобы выросло солнышко подсолнухом
Да дотянулось до неба до беспредельного?
`,
};

export default song;
