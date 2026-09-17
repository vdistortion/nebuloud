import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.stishochek,
  name: ['Стишочек'],
  albums: [EnumAlbums.princessaBezTrusov],
  authors: 'Шмель',
  text: `
Пробралась сырость в отчий дом, плесень и печаль
Осыпался с тулона кров, да потускнела даль
Бет сказал бы - Вот беда, грозящая петлёй
А я отвечу - хуета, рождённая хуйнёй
`,
};

export default song;
