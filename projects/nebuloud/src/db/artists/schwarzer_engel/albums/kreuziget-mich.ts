import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.kreuzigetMich,
  name: 'Kreuziget Mich',
  year: 2020,
  folder: '/artist/schwarzer_engel/albums/ab67616d0000b273935373b24567b4b384e28f9f.jpg',
  songs: [
    EnumSongs.kreuzigetMich,
    EnumSongs.teufel,
    { name: 'Paradies - Orchestral Soundtrack' },
    { name: 'Kreuziget Mich - Club-Remix' },
  ],
  info: `
  `,
};

export default album;
