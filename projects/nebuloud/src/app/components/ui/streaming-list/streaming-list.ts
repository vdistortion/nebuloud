import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { TypeStreaming, TypeStreamingList } from '../../../../db/types';

type TypeStreamingItem = {
  name: string;
  image: string;
};

@Component({
  selector: 'app-streaming-list',
  imports: [],
  templateUrl: './streaming-list.html',
  styleUrl: './streaming-list.scss',
})
export class StreamingList {
  @Input({ required: true }) public streaming: TypeStreaming | undefined;
  @Output() public clickStreaming = new EventEmitter<string>();

  protected readonly streamingList: Record<TypeStreamingList, TypeStreamingItem> = {
    spotify: {
      name: 'Spotify',
      image: 'spotify.svg',
    },
    appleMusic: {
      name: 'Apple Music',
      image: 'appleMusic.svg',
    },
    youtubeMusic: {
      name: 'YouTube Music',
      image: 'YouTubeMusic.svg',
    },
    soundcloud: {
      name: 'SoundCloud',
      image: 'soundcloud.svg',
    },
    amazonMusic: {
      name: 'Amazon Music',
      image: 'amazonMusic.svg',
    },
    bandcamp: {
      name: 'Bandcamp',
      image: 'bandcamp.svg',
    },
    yandexMusic: {
      name: 'Яндекс.Музыка',
      image: 'yandexMusic.svg',
    },
  };

  get list() {
    if (!this.streaming) return [];

    const list: [TypeStreamingList, string][] = Object.entries(this.streaming) as [
      TypeStreamingList,
      string,
    ][];

    return list.map(([id, link]) => {
      const { name, image } = this.streamingList[id];

      return {
        link,
        name,
        image,
      };
    });
  }
}
