import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.punkGuys,
  name: ['Punk Guys'],
  albums: [EnumAlbums.maniacParty],
  authors: 'Алик Грановский — Олег Горбунов',
  text: `
Trying, firing, hating to blame
Punk Guys are trying to get away
Crazier, lazier - punk guys again
Punk guys are going, where no one's shamed
Punk Guys!

Freakier, stinkier - they don't care
Punk guys are breaking out of cage
Greasier, sleazier, find of police,
Representation of human grace
Punk Guys!
`,
};

export default song;
