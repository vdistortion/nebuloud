import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.golosPalach,
  name: ['Голос-палач'],
  albums: [EnumAlbums.ostanoviteChelovechestvo, EnumAlbums.vosstanoviteChelovechestvo],
  authors: 'Шмель',
  text: `
Вскармливая свою ненависть ништяками неудач
Утешая свою гордость жижей из-под ног.
Вдруг снаружи голос - это твой палач,
Выходи из кожи, здравствуй, рядом Бог!

Палач, палач, палач - снаружи голос!
Палач, палач, палач!
`,
};

export default song;
