import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.poTuStoronuSna,
  name: 'По ту сторону сна',
  year: 2006,
  folder: '/artist/master/albums/ptcc_2006.jpg',
  songs: [
    EnumSongs.tanets,
    EnumSongs.geniiRoka,
    EnumSongs.muzikaSfer,
    EnumSongs.zaGranyu,
    EnumSongs.pesnyaAnnushki,
    EnumSongs.smertBerlioza,
    { name: 'Конферанс' },
    EnumSongs.mechtai,
    EnumSongs.voinaLiveInStudio,
    EnumSongs.poTuStoronuSna,
    { name: 'Лес Брокилон' },
    EnumSongs.krisi,
    EnumSongs.sinKamnya,
    EnumSongs.vremyaVarvarov,
    { name: 'Live in studio' },
    { name: 'Omut' },
    EnumSongs.mramorniiAngel,
    EnumSongs.poTuStoronuSna2,
  ],
  info: `
2006 год... Совместный проект Мастер+Margenta  это следующий шаг в эпоху тяжёлой культуры Российской сцены. Эксперименты со звуком и стилями увенчались успешным завершением работы  более чем в 1000 часов группы и всех участников проекта.

"Ты Мастер в том, что пережил, ремесленник в том, что переживаешь, и дилетант в том, что предстоит пережить".
"Никакого рая, никакого ада, только эти бесконечные миры, которые создаёшь, пока думаешь, что так и надо".

Состав:
Маргарита  Пушкина - автор текстов, внезапный телефонный звонок...
А. Страйк - гитара, вокал                  А.Ярушина - вокал
А. Грановский - бас-гитара                С.Скрипников - клавишные
LEXX - гитара, вокал, клавишные      М.Серышев - вокал
А. Карпухин - ударные, перкуссия   О.Кочубей - вокал
Г.Матвеев - клавишные                      М.Самосват - вокал
В.Ярушин - вокал                                 О.Дзусова - вокал
  `,
};

export default album;
