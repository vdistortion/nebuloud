import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.heroes,
  name: ['Heroes'],
  albums: [EnumAlbums.talkOfTheDevil],
  authors: 'Алик Грановский — Олег Горбунов',
  text: `
We are the heroes
We know no fears here we go
Take shot say cheers
Right time for heroes here we go
We grow strong
Running the show
We're getting tough
We cannot get enough
We smash the mirrors
We shed no tears running wild
Heroes fighting heroes
Fight to the top here we go
All doubts gone
We are not alone
Always on the line
Raging in the night
Heroes keep on moving
Making world go round
They know what they're doing
Make it
Hands are always steady
Sticking to the guns
Ready willing
Able to get it
Get it come on
Heroes to heroes
No dread no fears let it roll
Heroes by heroes
Hold on now here we come
Power and might
We got the right
We never say die
Picking up a fight
`,
};

export default song;
