import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.aistNadInkubatorom,
  name: ['Аист над инкубатором'],
  albums: [EnumAlbums.ostanoviteChelovechestvo, EnumAlbums.vosstanoviteChelovechestvo],
  authors: 'Шмель',
  text: `
Заходила в душу радость,
Погрустила и ушла.
Что за дерзость,- правда, гадость,-
Несмиренная душа!

Не простила, не забыла,
Ничего не сберегла,
Жаждой счастья напоила,
Смертью цепи порвала

Аист, Аист, Аист – над инкубатором
Аист, Аист, Аист – клонировать надо бы
Любовь

Так пропало всё, что зрело
В чреве страстного костра
Что сияло, почернело
В одночасье навсегда
`,
};

export default song;
