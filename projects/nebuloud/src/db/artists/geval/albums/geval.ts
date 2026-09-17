import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.geval,
  name: 'Гевал',
  year: 2009,
  folder: '/artist/geval/albums/1.webp',
  songs: [
    EnumSongs.zver,
    EnumSongs.iuda,
    EnumSongs.homoSapiens,
    EnumSongs.kamlanie,
    EnumSongs.troya,
    EnumSongs.gryaznyjHleb,
    EnumSongs.quoVadis,
    EnumSongs.heruvimy,
    EnumSongs.geval,
    EnumSongs.umryomZhivymi,
  ],
  info: `
В основе музыкального стиля группы лежит индастриал, смешанный с элементами готики и альтернативы, с тяжелым гитарным звуком. За свой сравнительно небольшой творческий путь группа успела выступить с такими коллективами, как SAMAEL, UNHEILIG, EISBRECHER - и была достойно принята "коллегами по цеху"

Состав:
Олег Юргенс - вокал, музыка, текст, идея
Константин Долотов - гитара
Евгений Сухотин - гитара
Константин Клименко - клавиши
Александр Мысливчук - бас
Дмитрий Кесов - ударные
  `,
};

export default album;
