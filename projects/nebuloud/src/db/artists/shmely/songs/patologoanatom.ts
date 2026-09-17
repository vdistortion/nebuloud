import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.patologoanatom,
  name: ['Патологоанатом'],
  albums: [EnumAlbums.risunkiNaDushe, EnumAlbums.spazmyRoka, EnumAlbums.poshmelye],
  authors: 'Шмель, Лёс - Шмель',
  duration: 184,
  text: `
Морфий, бинт и вата, –
Уснула вся палата.
Лишь не спит кибернетический маньяк –
Патологоанатом.

Патологоанатом
Патологоанатом
Робот ада, робот ада –
Синтетический патологоанатом
Патологоанатом
Патологоанатом

Вместо пота ртуть
Падает жертве на грудь.
Кислотные слезы разрывают атом.
Здесь запах чем-то напоминает ладан.

Утром проснутся люди.
Ничего не узнают они
Что скоро, разорвав их груди,
Вылетят железные ШМЕЛИ!
`,
};

export default song;
