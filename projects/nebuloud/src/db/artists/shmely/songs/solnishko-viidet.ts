import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.solnishkoViidet,
  name: ['Солнышко выйдет'],
  albums: [EnumAlbums.petlyaSoblazna, EnumAlbums.trahniNebo],
  authors: 'Шмель',
  clipYouTubeId: 'MDNmopAk_g8',
  text: `
Заверни в платочек увиденное, пережитое
Запихай в котомку животное свирепое
Не ищи ответы на вопросы избитые
Потопчись на месте — переступишь небо

Оближу с лица солёные слёзы,
Выну из сердца былые занозы.
Снова солнышко, солнышко выйдет
Солнышко, солнышко скатится.

Может что-нибудь желанное явится
В оперении на коже в пупырышках,
И задуманное сбудется, станется
И согреет милая зимушка
`,
};

export default song;
