import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { StreamingLinks, StreamingService } from '../../../models/content.models';

type StreamingItem = {
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
  @Input({ required: true }) public streaming: StreamingLinks | undefined;
  @Output() public clickStreaming = new EventEmitter<string>();

  protected readonly streamingList: Record<StreamingService, StreamingItem> = {
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

    const list: [StreamingService, string][] = Object.entries(this.streaming) as [
      StreamingService,
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
