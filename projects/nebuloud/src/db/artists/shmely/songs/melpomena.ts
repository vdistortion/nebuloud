import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.melpomena,
  name: ['Мельпомена'],
  albums: [EnumAlbums.vosemZhenshchinNaRaduge],
  authors: 'Шмель',
  text: `
Девять муз из них лишь она,
Остаётся одной,
В наказание за любовь,
Пой богиня, пой!
Пусть гибнет отравленный след,
Пусть гаснет обманчивый свет

Пой трагедия,
Мельпомена,
Мать трагедия,
И дочь сирена...

Вся планета в твоих слезах,
Истина в тоске,
Ты во мне, ты страсть и страх,
Но и я в тебе,
Ликует в изгнании люд,
Ведь им лишь богини поют...
`,
};

export default song;
