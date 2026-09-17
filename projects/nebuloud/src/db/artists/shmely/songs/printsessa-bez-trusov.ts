import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.printsessaBezTrusov,
  name: ['Принцесса без трусов'],
  albums: [EnumAlbums.princessaBezTrusov],
  authors: 'Шмель',
  text: `
Заводские трубы, неоновые будни
Мясо живое сладко вздохнуло
Первое чувство - что может быть паскудней
Крыша ушла, с неба задуло
Так встань на обе стороны
Реальность вон и вон все сны
Так ляг на грань параллельных миров

Принцесса без трусов придёт к тебе!
Принцесса без трусов придёт к тебе!
Принцесса без трусов придёт к тебе!
Принцесса без трусов придёт...
`,
};

export default song;
