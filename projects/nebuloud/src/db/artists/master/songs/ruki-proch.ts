import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.rukiProch,
  name: ['Руки прочь'],
  albums: [EnumAlbums.master, EnumAlbums.rcCars],
  authors: 'Алик Грановский — Александр Елин',
  text: `
Идет о нем молва,
Он - гений волшебства
Где было семь морей,
Теперь осталось двa.

Эй, руки прочь!
Трюк твой стар!
Здесь не арена, факир!
Эй, руки прочь
Блеск злых чaр
Hе обманет мир, мир, мир

Творит он чудеса,
Пускает пыль в глаза,
В пустыню и в золу,
Он превратил леса...


В нем совесть умерла,
Земля ему мала -
Он пять материков
Вот-вот сожжет до тлa...
`,
};

export default song;
