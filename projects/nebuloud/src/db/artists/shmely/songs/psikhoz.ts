import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.psikhoz,
  name: ['Психоз'],
  albums: [EnumAlbums.petlyaSoblazna, EnumAlbums.trahniNebo, EnumAlbums.vethijSbornik],
  authors: 'Шмель',
  text: `
То ту, то там огонь и срам,
Да голая мечта,
Гуляет прямо по головам
Служителей Креста

Психоз, психоз…
Вечный…

Сомненья вон, и к чёрту страх,
Когда в душе пластмасс,
Стремится смерть на всех порах
В чрево народных масс

В кукольном театре тишина,
И сторож пьяный спит,
А у забитого окна
Игрушечный шум стоит
Марионетки и короли,
Шуты и королевы
Устроили грязный кукольный секс
На середине сцены
`,
};

export default song;
