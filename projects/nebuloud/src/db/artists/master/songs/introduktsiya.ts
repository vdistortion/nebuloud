import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.introduktsiya,
  name: ['Интродукция'],
  albums: [EnumAlbums.klassika],
  authors: 'Геннадий Матвеев — Маргарита Пушкина',
  text: `
Когда Сатурн и Юпитер
Находятся в легком подпитии,
Когда мрачный Уран
Гонит черных быков за Урал,
Расплавь свинец,
Закали сталь,
Возьми красную ртуть,
Смешай с белым Солнцем,
И преврати в холодный янтарь...
И тебе откроется ПУТЬ!

Да хранит вас от всех напастей
Придумавший это
МАСТЕР...
`,
};

export default song;
