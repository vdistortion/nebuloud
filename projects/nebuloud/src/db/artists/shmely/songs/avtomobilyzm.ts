import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.avtomobilyzm,
  name: ['Автомобiлизм'],
  albums: [EnumAlbums.mizantropiya],
  authors: '',
  text: `
За кермом я відчуваю
Сильний поштовх влади
На шляху я відшукаю
Душу автостради

Швидкість - це моя стихія
Мозок - механізм
По судинах істерія
Автомобілізм - стихія!

Дощ і вітер - не загроза
Гори, я в підніжжі
Будуть, литимуть(?) грози
Я на бездоріжжі
`,
};

export default song;
