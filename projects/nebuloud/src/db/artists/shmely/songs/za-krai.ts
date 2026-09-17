import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.zaKrai,
  name: ['За край'],
  albums: [EnumAlbums.tvarynoiuPoruch],
  authors: 'Шмель, Лёс - Шмель',
  text: `
Зрада ніч!
Зрада день!
Зрада остання ніч
Зрада останній день

Ми їдемо за край
Ми з тобою поїдемо за край!

Омана тінь!
Омана світло!
Омана хвора тінь
Омана хворе світло

Ми їдемо за край
Ми з тобою поїдемо за край!

Туди, де немає людей
Туди, куди не треба речей
`,
};

export default song;
