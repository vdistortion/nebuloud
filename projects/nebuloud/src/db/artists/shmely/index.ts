import { Countries, TypeArtist, TypeStructure, TypeStructurePictures } from '../../types';
import { ArtistClass } from '../../artist.class';
import albums from './albums';
import songs from './songs';
import { EnumAlbums, EnumArtist } from './types';
import images from './images.json';

function transformStructure(
  structure: TypeStructure[],
  currentPath: string[] = [],
): TypeStructurePictures[] {
  const result = [];

  for (const entity of structure) {
    const newPath = [...currentPath, entity.name];

    if (entity.children && entity.type === 'folder') {
      // Проверяем, есть ли у папки файлы
      const pictures = entity.children
        .filter((child: TypeStructure) => child.type === 'file')
        .map((file: TypeStructure) => file.name);

      // Добавляем информацию о текущей папке в результат
      if (pictures.length > 0) {
        result.push({
          path: newPath,
          pictures,
        });
      }

      // Рекурсивно обрабатываем дочерние элементы
      const subResults = transformStructure(entity.children, newPath);
      result.push(...subResults);
    }
  }

  return result;
}

export const artist: TypeArtist = {
  id: EnumArtist.id,
  name: EnumArtist.name,
  image: '/artist/shmely/artist.webp',
  images: transformStructure(images),
  country: [Countries.ua, Countries.ru],
  streaming: {
    spotify: 'https://open.spotify.com/artist/4OXVjz9BARB2MwT6sdx8JE',
    soundcloud: 'https://soundcloud.com/shmieli/',
    amazonMusic: 'https://music.amazon.com/artists/B072TNGV9J/',
    youtubeMusic: 'https://music.youtube.com/channel/UCZkpG0pk3z1LondQYU_11Iw',
    bandcamp: 'https://shmely.bandcamp.com/',
    yandexMusic: 'https://music.yandex.ru/artist/213256',
  },
  albums: [
    EnumAlbums.durackiyeKnizhki,
    EnumAlbums.tulovishche,
    EnumAlbums.trotilovyyeSkazki,
    EnumAlbums.purga,
    EnumAlbums.petlyaSoblazna,
    EnumAlbums.zloradostnayaOpuhol,
    EnumAlbums.vulkanizaciyaDushi,
    EnumAlbums.princessaBezTrusov,
    EnumAlbums.moshchi,
    EnumAlbums.bombaVUbezhishche,
    EnumAlbums.trahniNebo,
    EnumAlbums.organizm,
    EnumAlbums.spazmyRoka,
    EnumAlbums.risunkiNaDushe,
    EnumAlbums.vethijSbornik,
    EnumAlbums.poshmelye,
    EnumAlbums.negativProstranstva,
    EnumAlbums.agressivnyjPokoj,
    EnumAlbums.polnaSuma,
    EnumAlbums.ostanoviteChelovechestvo,
    EnumAlbums.zhazhda,
    EnumAlbums.tenSerdca,
    EnumAlbums.lyod,
    EnumAlbums.vosemZhenshchinNaRaduge,
    EnumAlbums.pugovica,
    EnumAlbums.yaVernusKTebe,
    EnumAlbums.prishelcyVetotMir,
    EnumAlbums.koshkinyObidy,
    EnumAlbums.karamelnyyeStrahi,
    EnumAlbums.sbornik,
    EnumAlbums.moskovskayaYarmarkaUdovolstvij,
    EnumAlbums.neboProtiv,
    EnumAlbums.mekhanicheskayaBalerina,
    EnumAlbums.toplivo,
    EnumAlbums.cekhPoReabilitaciiParanoikov,
    EnumAlbums.teatrUrodov,
    EnumAlbums.paraTrupov,
    EnumAlbums.belyjKarandash,
    EnumAlbums.zloradostnayaOpuholNew,
    EnumAlbums.chudes16,
    EnumAlbums.mizantropiya,
    EnumAlbums.byuroVolshebnikhUslug,
    EnumAlbums.territoriyaNol,
    EnumAlbums.tvarynoiuPoruch,
    EnumAlbums.vosstanoviteChelovechestvo,
    EnumAlbums.chornyiLis,
    EnumAlbums.vidma,
    EnumAlbums.faktor,
    EnumAlbums.pyiDeKinPie,
    EnumAlbums.khaosZhelanii,
  ],
};

class Artist extends ArtistClass {
  artist = artist;
  override albums = albums;
  override songs = songs;
}

export default new Artist();
