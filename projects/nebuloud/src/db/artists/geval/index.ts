import { Countries, TypeArtist } from '../../types';
import { ArtistClass } from '../../artist.class';
import albums from './albums';
import songs from './songs';
import { EnumArtist, EnumAlbums } from './types';

export const artist: TypeArtist = {
  id: EnumArtist.id,
  name: EnumArtist.name,
  image: '/artist/geval/artist.webp',
  country: [Countries.ru],
  streaming: {
    spotify: 'https://open.spotify.com/artist/5j0IiA5tIUU6g08gmPJR7F',
    appleMusic: 'https://music.apple.com/us/artist/гевал/1112261994',
    youtubeMusic: 'https://music.youtube.com/channel/UCuRqoCtriIcKkgiBiCMdo8g',
  },
  albums: [
    EnumAlbums.geval,
    EnumAlbums.pergam,
    EnumAlbums.rim,
    EnumAlbums.longin,
    EnumAlbums.engel,
  ],
};

class Artist extends ArtistClass {
  artist = artist;
  override albums = albums;
  override songs = songs;
}

export default new Artist();
