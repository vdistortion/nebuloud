import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.littlePrincess,
  name: ['Little Princess'],
  albums: [EnumAlbums.burnTheCircus, EnumAlbums.madeInHell],
  duration: 284,
  text: `
Little princess in the forest
With so strange hypnotic eyes
She will reverse the fairy tale
And in the end, she’ll have to die
And at midnight you can see her
In the corner of your eye
As she claims souls of children
Who were born on starless nights

And after all the townsfolk have chorused
We leave unwanted children in the forest

Little princess in the forest
Wears antlers on her head
And her children bring her flowers
Which hold souls of the dead
They corrupt the fairy tale
They are laughing in reverse
They should all go down in flame
If we are to break this curse

The fire burning sounded like a song
And all the little children sang along

Guide them and leave them
You'll never see them
And their eyes will
Turn solid black
Won’t hear them creeping
You will be sleeping
When your unwanted
Start coming back

Little princess in the forest
Has a meathook for an arm
And her tears smell of poison
If she ever comes to harm
And she cried for her children
When they died and went to hell
And the flowers caught on fire
Where her poisoned tears fell

Little princess in the forest
With so strange hypnotic eyes
If we ever to survive this
Little princess has to die

Guide them and leave them
You'll never see them
And their eyes will
Turn solid black
Won’t hear them creeping
You will be sleeping
When your unwanted
Start coming back

Prayers are hollow
Darkness will follow
When your unwanted
Will break through the doors
Lost and abandoned
Your life has ended
The last thing you hear
Is your scream reversed
`,
};

export default song;
