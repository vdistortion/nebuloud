import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.kultDerKrHe,
  name: 'Kult der Krähe',
  year: 2018,
  folder: '/artist/schwarzer_engel/albums/ab67616d0000b27312a11ea6f8478342d91aee17.jpg',
  songs: [
    EnumSongs.krHenAnDieMacht,
    { name: 'Viva La Musica' },
    { name: 'Gott Ist Im Regen' },
    { name: 'Sinnflut' },
    { name: 'Futter Für Die See' },
    { name: 'Mein Glühend Herz' },
    { name: 'Ein Kurzer Augenblick' },
    { name: 'Meerflucht' },
    { name: 'Requiem' },
    { name: 'Unheil' },
    { name: 'Wenn Mein Herz Zerbricht' },
  ],
  info: `
  `,
};

export default album;
