import { Injectable } from '@angular/core';

import EVENTS from '../assets/model/events.json';
import LOCATIONS from '../assets/model/locations.json';
import ROUNDS from '../assets/model/rounds.json';

import EVENT_ALIASE from '../assets/model/event-aliase-dictionary.json';
import LOCATION_ALIASE from '../assets/model/location-aliase-dictionary.json';
import PREFECTURE_ALIASE from '../assets/model/prefecture-aliase-dictionary.json';

import { RoundInfo, EventInfo, LocationInfo } from './models';

export { RoundInfo, EventInfo, LocationInfo };

interface EventParts {
  count: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private primaryLanguage = true;

  constructor() {}

  toggleLanguage() {
    this.primaryLanguage = !this.primaryLanguage;
  }

  getRounds(): RoundInfo[] {
    return ROUNDS;
  }

  getEventAliase(eventName: string): string {
    if (this.primaryLanguage) {
      return eventName;
    }
    const parts = getEventKey(eventName);
    if (!parts) {
      return eventName;
    }
    const aliase = EVENT_ALIASE[parts.key];
    if (!aliase) {
      return eventName;
    }
    if (parts.count > 1960) {
      return !aliase ? eventName : `${parts.count}年 ${aliase}`;      
    }
    return !aliase ? eventName : `第${parts.count}回 ${aliase}`;
  }

  getPrefecture(prefectureName: string): string | undefined {
    if (!prefectureName) {
      return undefined;
    }
    if (this.primaryLanguage) {
      return prefectureName;
    }
    return PREFECTURE_ALIASE[getKeyFromName(prefectureName)]
      || prefectureName;
  }

  getEvent(eventName: string): EventInfo | undefined {
    return EVENTS[getKeyFromName(eventName)];
  }

  getLocation(locationName: string): LocationInfo | undefined {
    return LOCATIONS[getKeyFromName(locationName)];
  }

  getLocationName(locationName: string): string | undefined {
    if (this.primaryLanguage) {
      return locationName;
    }
    return LOCATION_ALIASE[getKeyFromName(locationName)] || locationName;
  }

  getGeolocation(ll: [number, number]): string | undefined {
    return ll
      ? getUrlForGeolocation() + `${ll[0]},${ll[1]}`
      : undefined;
  }

  getJpdgaInfo(eventId: string): string | undefined {
    return eventId
      ? `http://www.jpdga.jp/event.php?tno=${eventId}`
      : undefined;
  }

  getJpdgaResult(eventId: string): string | undefined {
    return eventId
      ? `http://www.jpdga.jp/result.php?tno=${eventId}`
      : undefined;
  }

  getJpdgaReport(topicId: string): string | undefined {
    return topicId
      ? `http://www.jpdga.jp/main/index.php?itemid=${topicId}`
      : undefined;
  }

  getJpdgaPhoto(photoId: string): string | undefined {
    return photoId
      ? `https://www.flickr.com/photos/jpdga/albums/${photoId}`
      : undefined;
  }

  getPdgaResult(eventId: string): string | undefined {
    return eventId
      ? `https://www.pdga.com/tour/event/${eventId}`
      : undefined;
  }

  getEventTitle(name: string): string {
    const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
    const results = name.trim().toLowerCase().match(eventName);
    return (!results || results.length !== 4)
      ? name
      : results[3];
  }
}

function getKeyFromName(name: string): string {
  if (!name) {
    return '';
  }
  return name.trim().toLowerCase().replace(/[ -]/g, '');
}

function getUrlForGeolocation(): string {
  return isAppleDevice()
    ? 'http://maps.apple.com/?ll='
    : 'https://maps.google.com/?q=';
}

function isAppleDevice(): boolean {
  return /iPhone|iPad|Macintosh/.test(window.navigator.userAgent);
}

function getEventKey(name: string): EventParts | undefined {
  if (!name) {
    return undefined;
  }
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/i;
  const results = name.trim().toLowerCase().match(eventName);
  if (!results || results.length !== 4) {
    return undefined;
  }
  return {
    count: results[1],
    key: results[3].replace(/[ -]/g, '')
  };
}
