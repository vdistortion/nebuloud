import { TypeAlbum } from '../../../types';
import { EnumAlbums } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.faktor,
  name: 'Фактор',
  year: 2022,
  folder: '/artist/shmely/albums/2022_faktor.jpg',
  streaming: {
    spotify: 'https://open.spotify.com/album/5EzM2ff6kmfEdNixIuhFJe',
    bandcamp: 'https://shmely.bandcamp.com/track/factor',
  },
  songs: [{ name: 'Фактор' }],
  info: `released January 25, 2022
У записі брали участь:
Олександр Шмельов, Льоля Заседателева, Таня Ліходєєва;
Юлия Борзая – вокал;
Наталія Бахтина – скрипка;
Артем Приходченко – ударні.

Студія «Eva Franki»;
Студія «Room 101»
----------------------------------------------------------
The track was recorded by:
Oleksandr Shmelyov, Lyola Zasedateleva, Tanya Lihodeeva;
Yulia Borzaya – vocals;
Natalia Bakhtina – violin;
Artem Prykhodchenko – drums.

«Eva Franki» studio;
«Room 101» studio.`,
};

export default album;
