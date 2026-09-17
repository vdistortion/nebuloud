import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.pokidayaMir,
  name: ['Покидая мир'],
  albums: [EnumAlbums.organizm, EnumAlbums.yaVernusKTebe],
  authors: 'Шмель',
  clipYouTubeId: 'LG8BvZiYcDA',
  text: `
Все сговорились против меня,
Забивают стрелки грехи с моей победой
А я теряю сам себя,
Зато пространство обретаю!

Покидая, покидая мир... (x3)
Принимаю формы астральных дыр
Покидая, покидая мир... (x3)
Стираю памяти застывший жир

Думай о хорошем с удовлетвореньем
Будет как захочешь: деньги, посылая духа
Отдай того на очищение,
Отдай же то, не требуя рая!
`,
};

export default song;
