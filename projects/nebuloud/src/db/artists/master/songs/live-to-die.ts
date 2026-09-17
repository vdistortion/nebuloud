import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.liveToDie,
  name: ['Live To Die'],
  albums: [EnumAlbums.talkOfTheDevil],
  authors: 'Сергей Попов — Олег Горбунов',
  text: `
Live to die
Cry to smile
Feel like dead
I'm misled
And it seems it gets me too far
Sounds are dead
Lights went out
I keep searching
There's no guide
But I try
To strike non-existing luck
Dirt and dust
Flesh an lust
Demon makes his feast
Human lies
In disguise
Drowned in the mist
No faith in future
No truth in past
No consolation
I'm going west
Jesus tears dripping down
Turning into endless rain
No one hears no one cares
Now we all prepared to slain
No way out
No way in
We are in the cul de sac
Yell and shout
Shake and tremble
Nobody gives a fuck
Blood and sweat
Cries of dead
It's a sataning feast
Sense of dread
Drives us mad
It's the age of beast
Murder and slaughter
Treason and fraud
Blood tastes like water
So fucking what?!
`,
};

export default song;
