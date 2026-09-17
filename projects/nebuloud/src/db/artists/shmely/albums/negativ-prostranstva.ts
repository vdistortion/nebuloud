import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.negativProstranstva,
  name: 'Негатив пространства',
  year: 2002,
  folder: '/artist/shmely/albums/2002_negativ.jpg',
  streaming: { yandexMusic: 'https://music.yandex.ru/album/79306' },
  songs: [
    EnumSongs.reanimator,
    EnumSongs.veraILyubov,
    EnumSongs.volchitsa,
    EnumSongs.nezhnost,
    EnumSongs.slyoznaya,
    EnumSongs.pervorodniiGrekh,
    EnumSongs.likhoraditMenyaNoch,
    EnumSongs.negativProstranstva,
    [EnumSongs.posledniiReis, { name: ['Последний рейс (Клочья)'] }],
    EnumSongs.visota,
    EnumSongs.proshchai,
    EnumSongs.cherezKrai,
    EnumSongs.braga,
    EnumSongs.vsyo,
    [EnumSongs.reanimator, { name: ['Реаниматор (Club MIX)'] }],
  ],
  info: `"НЕГАТИВ ПРОСТРАНСТВА" (2002)

Лёс - вокал
Шмель - вокал, бас, музыка, тексты
Росс - клавиши
Иван - гитара
Сова - гитара
Мартын - барабаны.
Альбом записан и сведён на A. W. Studio в 2002 году, выпущен студией ”Мистерия” в 2003 году.
Запись вокальных и некоторых гитарных партий сделана на студии фирмы "Тенип".
Запись вокала на песню "Первородный грех" произведена у Макса Экса.

Альбом являет собой уже более установившийся стиль группы.
Тяжёлые гитары на фоне электронных нагромождений, неизменно зомбирующие вокалы не на шутку заставляют задуматься обо Всём!
И ещё неизвестно, что лучше, - понять или не понять тексты, сверлящие душу.`,
};

export default album;
