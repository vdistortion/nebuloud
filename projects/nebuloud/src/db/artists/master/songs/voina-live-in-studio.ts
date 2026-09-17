import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.voinaLiveInStudio,
  name: ['Война (Live in studio)'],
  albums: [EnumAlbums.poTuStoronuSna],
  authors: '«Мастер» — Маргарита Пушкина',
  text: `
Не убьют здесь, так убьют там,
Или по-зверски искалечат,
Война любого превратит в скота,
А ты твердишь про победу и вечность!
`,
};

export default song;
