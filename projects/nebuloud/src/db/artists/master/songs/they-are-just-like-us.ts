import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.theyAreJustLikeUs,
  name: ['They Are Just Like Us'],
  albums: [EnumAlbums.maniacParty],
  authors: 'Алик Грановский — Олег Горбунов',
  text: `
Don't you know times in underground
Drinking vodka and having fun
it's not an endless sticking mass
Runnig on a bugi-vugi test
We're constructing rock-'n'-roll
Banging like a wretched ball
We must run at slipping fast
Life is just a real funking gas

They are just like us
Hide behind the doors
It's a same old chat
What we do about it
Coming generation's like us
They may do the change
But it's all the same
Fallen democrats
Same old chat of us
Shall we stand right where we stood before?

And we stand right where we stood
What would be done - it's no good
But anyway it's all the same
Organized to a bloody game
One step forward, two steps back
The system sucks and we've got stuck
In swollen politicians' web
Just got the nose in spider web
`,
};

export default song;
