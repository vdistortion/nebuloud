import { TypeSong } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const song: TypeSong = {
  id: EnumSongs.ivolga,
  name: ['Иволга'],
  albums: [
    EnumAlbums.moshchi,
    EnumAlbums.organizm,
    EnumAlbums.polnaSuma,
    EnumAlbums.vosemZhenshchinNaRaduge,
    EnumAlbums.byuroVolshebnikhUslug,
  ],
  authors: 'Шмель',
  text: `
Бродил по кочкам, искал он невесту
Как сказочный сюжет, как сломанный кустик
Аль богатырь не богатырь с далёкого места
Пашней битою, топтаной линией
Древо не политое, да сока ногтем срезанное
Аль богатырь не богатырь пятками на лилии

Иволгой, иволгой петь
С иволгой песню болота
Бьёт в колокольчики пономарь
Квазимодо

Ах да охотушка ты () в пустыне
Кочергой доставал из души камушки
Аль богатырь не богатырь, а сердце стынет
забыл про цель свою, истек до ниточки
Полил дерево, корни не принялись
И небо скукожилось невестою синею
`,
};

export default song;
