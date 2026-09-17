import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.zhizni33,
  name: '33 жизни',
  year: 2004,
  folder: '/artist/master/albums/33zizni_2004.jpg',
  songs: [
    EnumSongs.igra,
    EnumSongs.masterSkorbnikhDel,
    EnumSongs.veraGoritNaKostrakh,
    EnumSongs.zhizni,
    EnumSongs.ekspress,
    EnumSongs.glotokOgnya,
    { name: 'Война миров' },
    EnumSongs.heavyLambada,
    EnumSongs.snezhniiOkhotnik,
    EnumSongs.stikhiya,
    { name: 'Дети подземелья' },
  ],
  info: `
Альбом "33 жизни" записан на студии Мастер-Рекордс в 2004 году. В оформлении альбома был использован рисунок Алексея Страйка. Обложку для альбома нарисовал художник Андрей Барков (Grimmy bro). Альбом "33 жизни" был выпущен на CD ООО "Мастер-консультант".



Состав:
Страйк - гитара           А.Грановский - бас-гитара
Лекс - вокал                 А.Карпухин - ударные
  `,
};

export default album;
