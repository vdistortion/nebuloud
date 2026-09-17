import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.lakaiOtravu,
  name: ['Лакай отраву'],
  albums: [EnumAlbums.purga, EnumAlbums.agressivnyjPokoj, EnumAlbums.byuroVolshebnikhUslug],
  authors: 'Шмель',
  text: `
Колдовские камни превращая в пар
Приготовлю солнцу ядерный отвар

Лакай, ла-лакай, лакай, ла-лакай
Отраву, отраву, отраву, отраву, отраву

Из плодов запретных, из волшебных чар
Из любовных капель сделаю отвар

Лакай, ла-лакай, лакай, ла-лакай
Отраву, отраву, отраву, отраву, отраву

Пускай расплавятся мысли твои
Тебе понравится, ты только не грусти
`,
};

export default song;
