import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.yaVernusKTebe,
  name: 'Я вернусь к тебе',
  year: 2006,
  folder: '/artist/shmely/albums/2006_vernus.jpg',
  songs: [
    EnumSongs.zhdiMenyaVPolnoch,
    EnumSongs.angeliVDveryakh,
    EnumSongs.vyuga,
    EnumSongs.laboratoriyaAltruizma,
    EnumSongs.groza,
    EnumSongs.biomekhanika,
    [EnumSongs.kloun, { name: ['Клоун умер'] }],
    EnumSongs.bol,
    EnumSongs.pokidayaMir,
    EnumSongs.vseMechtiSbivayutsya,
    EnumSongs.drama,
    EnumSongs.evakuator,
    EnumSongs.dramaturgiya,
  ],
  info: `
В отличие от многочисленных предыдущих альбомов и сборников, здесь музыканты решили использовать при записи живые ударные, что, конечно же, отразилось на общем звучании команды. Во многом благодаря новому второму гитаристу Голландцу саунд значительно утяжелился, гитары просто ревут и раздавливают мощью на протяжении всего альбома. Такого мощного звука не было со времен альбома Тень сердца.
По сути Я вернусь к тебе... является не полноценным альбомом, а сборником из коронных живых номеров группы, записанных заново, а так же пары новых песен, которые впрочем, не уступают в хитовости старым песням. Здесь поклонники коллектива найдут такие замечательные композиции как Боль, Гроза, Ангелы в дверях и даже такую древнюю песню как Вьюга. К минусам можно отнести несколько размытый и слишком живой звук, порой, кажется, что альбом является хорошо снятым концертником, а так же не очень вразумительные бонусы в виде песен проекта Драматургия.
  `,
};

export default album;
