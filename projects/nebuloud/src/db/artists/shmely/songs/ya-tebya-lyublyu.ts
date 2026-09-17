import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.yaTebyaLyublyu,
  name: ['Я тебя люблю'],
  albums: [EnumAlbums.karamelnyyeStrahi],
  authors: 'Шмель',
  text: `
За белою грудью твое сладкое сердце
Беспомощно бьётся, но пальцы как лёд
Внезапная встреча и шёпот зовет
Безудержно робкая дрожь.

Пьешь жизнь мою
Что ж, я дарю
Пьешь жизнь мою
Что ж, я дарю
Ведь я тебя люблю
Я тебя люблю
Я тебя люблю
Люблю

За лаской ресниц твои тайные страсти
Все рвутся на волю, но губы молчат
На линии шеи сосуды стучат
И звездочкой плавится брошь.
`,
};

export default song;
