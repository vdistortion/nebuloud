import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.chornyiLis,
  name: 'Чорний Лiс',
  year: 2021,
  folder: '/artist/shmely/albums/2021_chornyiLis.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/1AxIvEvramvGWsppStW84k',
    bandcamp: 'https://shmely.bandcamp.com/album/ic-the-black-forest',
  },
  songs: [
    EnumSongs.himnChornohoLisu,
    EnumSongs.lysheMene,
    EnumSongs.mavka,
    EnumSongs.vovkulaka,
    EnumSongs.vodianyk,
    EnumSongs.poterchata,
    EnumSongs.pisniaMavok,
    EnumSongs.myslyvets,
    EnumSongs.sameTa,
    EnumSongs.kolyskovaChu,
    EnumSongs.bisovKut,
    EnumSongs.chuhaisterYde,
  ],
  info: `До україномовногу альбому «Чорний Ліс» ввійшли пісні з вистави «БісОв Кут», а також композиції, що розповідають про персонажів, які з'являться у наступній виставі.
Бонус: відео-фрагмент вистави «БісОв Кут».
----------------------------------------------------------
The Ukrainian-language album includes songs from the theatrical performance called «BisOv Corner» («БісОв Кут»), as well as songs about characters that will appear in the next performance.
Bonus: short video-clip of the theatrical performance «BisOv Corner» («БісОв Кут»).
credits
released August 8, 2021

У записі альбому брали участь:
Олександр Шмельов, Льоля Заседателева, Таня Ліходєєва;
Ніка Мельник – «Саме та» (текст);
Іван Тимошенко – «Водяник» (гітара).

Студія «Eva Franki».
----------------------------------------------------------
The album was recorded by:
Oleksandr Shmelyov, Lyola Zasedateleva, Tanya Lihodeeva;
Nika Melnik – «You Are the One» (lyrics);
Ivan Timoshenko – «Vodyanik» (guitar).

«Eva Franki» studio.`,
};

export default album;
