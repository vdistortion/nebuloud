import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.volosy,
  name: ['Волосы', 'На солнце волосы'],
  albums: [
    EnumAlbums.durackiyeKnizhki,
    EnumAlbums.vulkanizaciyaDushi,
    EnumAlbums.spazmyRoka,
    EnumAlbums.poshmelye,
  ],
  authors: 'Шмель, Лёс - Шмель',
  duration: 198,
  text: `
Руки, что тянулись вон, туго связаны
Не добраться до мечты
Вены, что несли любовь, нежно вспороты
Как разведённые мосты

На солнце волосы
На солнце волосы

Платье, что пустилось в пляс, стёрлось в дырочки
Загорелось и прошло
Сани, что катились вниз, заупрямились
Когда солнышко взошло

На солнце волосы
На солнце волосы
На солнце волосы
На солнце волосы
`,
};

export default song;
