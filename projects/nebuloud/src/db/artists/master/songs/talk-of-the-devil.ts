import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.talkOfTheDevil,
  name: ['Talk Of The Devil'],
  albums: [EnumAlbums.talkOfTheDevil],
  authors: 'Андрей Большаков — Олег Горбунов',
  text: `
Talk of the Devil,
And he's sure to come.
Thinking of Evil,
And things will go wrong.
On this small wild planet
We live and die.
We keep on messing
Through space and time.
I could be a preacher,
I bet I could be.
But I'm just a creature
Who's born to sin

Born to Sin
Born to Cry
Born to Live
Born to Die

Here comes,
Here comes a brand new dawn.
Who knows, who cares
If you went wrong?
We talk of the Devil
He wouldn't come.
We're thinking of Evil
And nothing goes wrong
Get Crazy, mean world
No end to war!
Breaking all rules
We got no choice.
`,
};

export default song;
