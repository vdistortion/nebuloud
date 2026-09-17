import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.howNightmaresDie,
  name: 'How Nightmares Die',
  year: 2020,
  folder: '/artist/tardigrade_inferno/albums/2020_hnd.jpg',
  songs: [EnumSongs.howNightmaresDie],
  info: `
A story about an inventor, battling people's nightmares with bullets and steampunk machinery. It was supposed to be a small experiment that we wanted to make while on lockdown, but the video slowly outgrew the scope of the initial project. So it is a small song with great ambitions. Music is still dark and with a heart of metal, but with electricity in its veins and with a gun, loaded with old drum samples.
`,
};

export default album;
