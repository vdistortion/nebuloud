import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.krasota,
  name: ['Красота'],
  albums: [EnumAlbums.ostanoviteChelovechestvo, EnumAlbums.vosstanoviteChelovechestvo],
  authors: 'Шмель',
  text: `
Поливал, поливал кресты, поливал.
Завязал, завязал узлы бес.
Целовал языки огня, целовал.
Заковал, заковал себя лес.

Но ты станешь покорна,
Но ты станешь покорна и мила,
Природы красота.
Но ты станешь покорна,
Но ты станешь покорна на века,
Природы красота.

Поменял, поменял на сон смерть,
Заменил на всевышний трон твердь.
Не ложил совершенный плод чувств,
Зажигал волну антиискусств
`,
};

export default song;
