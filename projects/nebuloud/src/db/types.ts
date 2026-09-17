type TypeId = string;

export const enum Countries {
  de = 'Германия',
  ru = 'Россия',
  ua = 'Украина',
}

export type TypeStreamingList =
  | 'spotify'
  | 'bandcamp'
  | 'soundcloud'
  | 'amazonMusic'
  | 'youtubeMusic'
  | 'appleMusic'
  | 'yandexMusic';

type SongPlaceholder = TypeId | { name: string } | [TypeId, { name: string[] }];

export type TypeStreaming = Partial<Record<TypeStreamingList, string>>;

export type TypeStructure = {
  type: string;
  name: string;
  children?: TypeStructure[];
};

export type TypeStructurePictures = {
  path: string[];
  pictures: string[];
};

export type TypeArtist = {
  id: TypeId;
  name: string;
  albums: TypeId[];
  image: string;
  images?: TypeStructurePictures[];
  streaming?: TypeStreaming;
  country: string[];
};

export type TypeArtistSummary = {
  id: TypeId;
  name: string;
  image: string;
  country: string[];
};

export type TypeAlbum = {
  id: TypeId;
  name: string;
  year: number;
  songs: SongPlaceholder[];
  info?: string;
  folder?: string;
  order?: number;
  streaming?: TypeStreaming;
};

export type TypeAlbums = Record<TypeId, TypeAlbum>;

export type TypeSong = {
  id: TypeId;
  name: string[];
  albums: TypeId[];
  text: string;
  authors?: string;
  clipYouTubeId?: string;
  duration?: number;
};

export type TypeSongs = Record<TypeId, TypeSong>;

export type TypeItem = {
  artist: TypeArtist;
  albums: TypeAlbums;
  songs: TypeSongs;
  getSongsWithTexts(): TypeSong[];
  getSongsWithoutAlbum(): TypeSong[];
  getAllVideos(): TypeSong[];
  sortAsc(a: TypeSong, b: TypeSong): number;
  sortByYears(a: TypeSong, b: TypeSong): number;
  yearOfSong(song: TypeSong): number;
};

export type TypeItems = Record<TypeId, TypeItem>;
