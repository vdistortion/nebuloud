import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.madeInHell,
  name: 'Made in Hell',
  year: 2025,
  folder: '/artist/tardigrade_inferno/albums/2025_mih.jpg',
  songs: [
    { name: 'Einzug Der Gladiatoren' },
    EnumSongs.allTardigradesGoToHell,
    EnumSongs.hypnosis,
    EnumSongs.ringmasterHasToDie,
    EnumSongs.tickTock,
    EnumSongs.theWorstOfMe,
    EnumSongs.dreadfulSong,
    EnumSongs.firePlagueAndLocust,
    EnumSongs.outOf,
    EnumSongs.churchAsylum,
    EnumSongs.rats,
    EnumSongs.cholera,
    EnumSongs.clownTherapy,
    EnumSongs.evoke,
    EnumSongs.writeWithBlood,
    EnumSongs.mastermind,
    EnumSongs.lovelyHost,
    EnumSongs.littlePrincess,
    EnumSongs.arrivalOfATrain,
    EnumSongs.clockworkGod,
    EnumSongs.weAreNumberOne,
    EnumSongs.executionIsFun,
  ],
  info: `
  `,
};

export default album;
