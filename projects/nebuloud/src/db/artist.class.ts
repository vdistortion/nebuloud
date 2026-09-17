import { TypeAlbum, TypeSong } from './types';

export abstract class ArtistClass {
  songs: Record<string, TypeSong> = {};
  albums: Record<string, TypeAlbum> = {};

  getSongsWithTexts(): TypeSong[] {
    return Object.values(this.songs).filter((song) => song.text);
  }

  getSongsWithoutAlbum(): TypeSong[] {
    return Object.values(this.songs).filter((song) => !song.albums.length);
  }

  getAllVideos(): TypeSong[] {
    return Object.values(this.songs).filter((song) => song.clipYouTubeId);
  }

  sortAsc(a: TypeSong, b: TypeSong): number {
    if (a.name[0] < b.name[0]) return -1;
    if (a.name[0] > b.name[0]) return 1;
    return 0;
  }

  sortByYears(a: TypeSong, b: TypeSong): number {
    if (this.yearOfSong(a) < this.yearOfSong(b)) return -1;
    if (this.yearOfSong(a) > this.yearOfSong(b)) return 1;
    return 0;
  }

  yearOfSong(song: TypeSong): number {
    const years = song.albums.map((id) => this.albums[id].year);
    if (!years.length) return 0;
    return Math.min(...years);
  }
}
