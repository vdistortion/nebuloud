import { TypeAlbum } from '../../../types';
import { EnumAlbums, EnumSongs } from '../types';

const album: TypeAlbum = {
  id: EnumAlbums.mastermind,
  name: 'Mastermind',
  year: 2019,
  folder: '/artist/tardigrade_inferno/albums/2019_m.jpg',
  songs: [
    EnumSongs.allTardigradesGoToHell,
    EnumSongs.hypnosis,
    EnumSongs.dreadfulSong,
    EnumSongs.alabamaSong,
    { name: 'Precourse' },
    EnumSongs.clownTherapy,
    EnumSongs.allPigsAreTheSame,
    EnumSongs.churchAsylum,
    EnumSongs.marmalade,
    EnumSongs.imComingForYourSoul,
    EnumSongs.mastermind,
    EnumSongs.weAreNumberOne,
  ],
  info: `
  `,
};

export default album;
/*
 { name: 'All Tardigrades go to Hell' },
    { name: 'Hypnosis' },
    { name: 'Dreadful Song' },
    { name: 'Alabama Song' },
        { name: 'Clown Therapy' },
    { name: 'All Pigs are the Same' },
    { name: 'Church Asylum' },
    { name: 'Marmalade' },
    { name: 'I`m Coming for Your Soul' },
    { name: 'Mastermind' },
    { name: 'We Are Number One' },
 */
