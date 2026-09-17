import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.taran,
  name: ['Таран'],
  albums: [EnumAlbums.labirint, EnumAlbums.rcCars],
  authors: 'Андрей Лебедев, Алик Грановский — Андрей Лебедев',
  text: `
Земли больше нет,
Летим над облаками,
Летим в жару и холод
К неведомым врагам!

Земли больше нет!
Пустые бензобаки,
Закончились патроны -
Остался лишь таран!

Мы летим вперед,
Но глядим назад -
Целый самолета хвост?

Вот на что надо смотреть
Каждые 15 секунд!
Чтобы не зажег нам хвост
Чужой самолет,
С целью совершить таран!
`,
};

export default song;
