import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.weAreNumberOne,
  name: ['We Are Number One'],
  albums: [EnumAlbums.mastermind, EnumAlbums.madeInHell],
  clipYouTubeId: 'mzJ4vCjSt28',
  duration: 146,
  text: `
We are number one!

Now listen closely
Here's a little lesson in trickery
This is going down in history
If you wanna be a Villain Number One
You have to chase a superhero on the run
Just follow my moves, and sneak around
Be careful not to make a sound

Ha ha ha
Now look at this net, that I just found
When I say go, be ready to throw
Go!
Let's try something else

Now watch and learn, here's the deal
He'll slip and slide on this banana peel!
Ha ha ha
What are you doing!?
`,
};

export default song;
