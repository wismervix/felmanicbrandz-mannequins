import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // public baseUrl = 'http://127.0.0.1:8000/api';
  public baseUrl = 'https://api.felmanicbrandz.com/api';

  getMediaUrl(media?: any): string {
    if (!media) return '';

    // NEW STRUCTURE (object)
    if (typeof media === 'object' && media.url) {
      return media.url;
    }

    // OLD STRUCTURE (string)
    if (typeof media === 'string') {
      if (media.startsWith('http')) return media;

      return `${this.baseUrl.replace('/api', '/storage/')}${media}`;
    }

    return '';
  }
}
