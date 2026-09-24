import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  set(data: { title: string; description: string; image?: string; canonical?: string }) {
    this.title.setTitle(data.title);
    this.setMeta('description', data.description);
    this.setMeta('og:title', data.title, 'property');
    this.setMeta('og:description', data.description, 'property');
    this.setMeta('og:type', 'website', 'property');
    if (data.image) this.setMeta('og:image', data.image, 'property');

    if (data.canonical) {
      let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = this.document.createElement('link');
        link.rel = 'canonical';
        this.document.head.appendChild(link);
      }
      link.href = data.canonical;
    }
  }

  private setMeta(name: string, content: string, attribute = 'name') {
    this.meta.updateTag({ [attribute]: name, content });
  }
}
