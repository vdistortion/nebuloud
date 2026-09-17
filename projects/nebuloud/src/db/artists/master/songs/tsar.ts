import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.tsar,
  name: ['Tsar'],
  albums: [EnumAlbums.talkOfTheDevil],
  authors: 'Сергей Попов — Олег Горбунов',
  text: `
Raise hands up, you who're alive
We really lost this game
The new Tsar's gone too far,
wanting the same to stay
Snake is crawling longer than life
Anglier than Hell
Scream out loud, fool all around
Drink for the rest of your days
HEY TSAR - YOU WENT FAR
HEY YOU TSAR - YOU'RE A STAR
Raise your hands and face the wall
No solution in wine
Drunkards, jukies having fun
tasting a bottle of rum
Raise hands, not to the clouds,
but to the ceilings low
New Tsar has gone too far
punching us in the jaw
God's unsafe - Devil's unsafe
The monster is hating us
Raise your hands, this is the end
We live in a goddamned land
`,
};

export default song;
