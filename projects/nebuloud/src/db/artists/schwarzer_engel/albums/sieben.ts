import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.sieben,
  name: 'Sieben',
  year: 2022,
  folder: '/artist/schwarzer_engel/albums/ab67616d0000b273548d004935efdd292be8d6bd.jpg',
  songs: [
    { name: 'VII' },
    EnumSongs.kreuzigetMich,
    EnumSongs.teufel,
    { name: 'Paradies' },
    { name: 'Ewig Leben' },
    { name: 'Wie Viele Jahre' },
    { name: 'Schlitzer' },
    { name: 'Vollmond' },
    { name: 'Ring Frei' },
    { name: 'Schönheit' },
    { name: 'Endzeit' },
  ],
  info: `
  `,
};

export default album;
