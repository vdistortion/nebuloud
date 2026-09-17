import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.danger,
  name: ['Danger'],
  albums: [EnumAlbums.talkOfTheDevil],
  authors: 'Сергей Попов — Олег Горбунов',
  text: `
Flashlights hit the sky,
Here comes roaring vengeance,
This town is on fire.
I can sense a danger,
Red flies fill the atmosphere,
Darkness bleeding so hard.
No escape from deadly fear,
Horror strikes my heart.
The price humans pay
For being so sinful,
There ain't much to save
The bell is ringing.
DANGER! DANGER! DANGER!
It's Judgement Day!
We all face the teial!
Nobody is safe,
This world is on fire,
No refuge from hand of doom!
Prosecutor has come
Planet wrapped up in a gloom,
Everything goes down.
DANGER! DANGER! DANGER!
The price humans pay
For being so sinful,
There ain't much to save,
The bell is ringing.
Hand of doom is hung above,
We must pay our bills.
Hell is really coming tough
Can't you tell it's thrill!
DANGER! DANGER! DANGER!
`,
};

export default song;
