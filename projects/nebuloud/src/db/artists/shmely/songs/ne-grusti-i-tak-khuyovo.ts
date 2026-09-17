import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.neGrustiITakKhuyovo,
  name: ['Не грусти, и так хуёво'],
  albums: [EnumAlbums.durackiyeKnizhki],
  authors: 'Шмель',
  text: `
Что грустишь, повесив веки
На забитый в стенку гвоздь
Может ты уснул на веки
Поимей ты грусть и брось!!!
И так хуёво...

Не грусти и так всем грустно
Спрячь в чулан свою печаль
Может жизнь твоя без чувства
Может умер ты - так жаль...
И так хуёво...

Не всплакнёшь, не скажешь слово
Не уйдёшь в большой запой
Не грусти, и так хуёво
Лучше песенку ты спой!!!
И так хуёво...
`,
};

export default song;
