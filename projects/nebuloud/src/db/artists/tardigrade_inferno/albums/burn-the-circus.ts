import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.burnTheCircus,
  name: 'Burn the Circus',
  year: 2023,
  folder: '/artist/tardigrade_inferno/albums/2023_btc.jpg',
  songs: [
    EnumSongs.ringmasterHasToDie,
    EnumSongs.clockworkGod,
    EnumSongs.rats,
    EnumSongs.cholera,
    EnumSongs.tickTock,
    EnumSongs.outOf,
    EnumSongs.littlePrincess,
    EnumSongs.splinterInTheEye,
    EnumSongs.nailedToTheFerrisWheel,
    EnumSongs.wearingWhite,
    EnumSongs.burnTheCircus,
  ],
  info: `
  `,
};

export default album;
/*
    { name: 'Clockwork God' },
    { name: 'Rats' },
    { name: 'Cholera' },
    { name: 'Tick-Tock' },
    { name: '9 out of 10' },
    { name: 'Little Princess' },
    { name: 'Splinter in the Eye' },
    { name: 'Nailed to the Ferris Wheel' },
    { name: 'Wearing White' },
    { name: 'Burn the Circus' },
 */
