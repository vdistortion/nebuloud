import { Injectable } from '@angular/core';

declare global {
  interface Window {
    ym?: Function;
  }
}

@Injectable({
  providedIn: 'root',
})
export class Analytics {
  sendYMEvent(eventName: string, params?: { [key: string]: any }) {
    if (typeof window.ym !== 'undefined') {
      window.ym(104208876, 'reachGoal', eventName, params);
    }
  }

  sendEvent(eventName: string, params?: { [key: string]: any }) {
    this.sendYMEvent(eventName, params);
  }
}
