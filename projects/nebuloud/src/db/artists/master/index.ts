import { Countries, TypeArtist } from '../../types';
import { ArtistClass } from '../../artist.class';
import albums from './albums';
import songs from './songs';
import { EnumAlbums, EnumArtist } from './types';

export const artist: TypeArtist = {
  id: EnumArtist.id,
  name: EnumArtist.name,
  image: '/artist/master/artist.webp',
  country: [Countries.ru],
  streaming: {
    spotify: 'https://open.spotify.com/artist/3Gocx0waYCfV2wx0d5nKzs',
    youtubeMusic: 'https://music.youtube.com/channel/UC8n4KOpcZlbnWJ1DHa96k9Q',
    amazonMusic: 'https://music.amazon.com/artists/B00FMZUEIQ/',
    yandexMusic: 'https://music.yandex.ru/artist/359599',
  },
  albums: [
    EnumAlbums.master,
    EnumAlbums.sPetlyojNaShee,
    EnumAlbums.talkOfTheDevil,
    EnumAlbums.maniacParty,
    EnumAlbums.pesniMyortvyh,
    EnumAlbums.labirint,
    EnumAlbums.klassika,
    EnumAlbums.rcCars,
    EnumAlbums.zhizni33,
    EnumAlbums.akustika,
    EnumAlbums.poTuStoronuSna,
    EnumAlbums.viii,
  ],
};

class Artist extends ArtistClass {
  artist = artist;
  override albums = albums;
  override songs = songs;
}

export default new Artist();
