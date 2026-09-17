import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.hHereGewalt,
  name: 'Höhere Gewalt',
  year: 2024,
  folder: '/artist/schwarzer_engel/albums/ab67616d0000b273e5231b3c5e3b0b1675908ad6.jpg',
  songs: [
    { name: '100 Jahre' },
    { name: 'Einer Gegen Alle' },
    EnumSongs.hitsingle,
    { name: 'Kunstprodukt' },
    { name: 'Jetzt Herrscht Krieg' },
    { name: 'Krähenbruder' },
    { name: 'In Nomine Patris' },
    { name: 'Licht Am Horizont' },
    { name: 'Die Alte Flagge' },
    { name: 'Schwarzer König' },
    { name: 'Engel Für Alle' },
  ],
  info: `
  `,
};

export default album;
