import { Injectable } from '@angular/core';

import EVENTS from '../assets/model/events.json';
import LOCATIONS from '../assets/model/locations.json';
import ROUNDS from '../assets/model/rounds.json';

import EVENT_ALIASE from '../assets/model/event-aliase-dictionary.json';
import LOCATION_ALIASE from '../assets/model/location-aliase-dictionary.json';
import PREFECTURE_ALIASE from '../assets/model/prefecture-aliase-dictionary.json';

import { RoundInfo } from './models';

export { RoundInfo };

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

  getEventAliase(name: string): string {
    if (this.primaryLanguage) {
      return name;
    }
    const parts = getEventKey(name);
    if (!parts) {
      return name;
    }
    const aliase = EVENT_ALIASE[parts.key];
    return !aliase ? name : `第${parts.count}回 ${aliase}`;
  }

  getPrefectureFromEvent(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.location) {
      return undefined;
    }
    return this.getPrefectureFromLocation(event.location);
  }

  getPrefectureFromLocation(locationName: string): string | undefined {
    const location = LOCATIONS[getKeyFromName(locationName)];
    if (!location || !location.prefecture) {
      return undefined;
    }
    if (this.primaryLanguage) {
      return location.prefecture;
    }
    return PREFECTURE_ALIASE[getKeyFromName(location.prefecture)]
      || location.prefecture;
  }

  getLocationNameFromEvent(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.location) {
      return undefined;
    }
    return this.getLocationAliase(event.location);
  }

  getLocationAliase(locationName: string): string {
    if (this.primaryLanguage) {
      return locationName;
    }
    return LOCATION_ALIASE[getKeyFromName(locationName)] || locationName;
  }

  getGeolocationFromEvent(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.location) {
      return undefined;
    }
    const location = LOCATIONS[getKeyFromName(event.location)];
    return location && location.geolocation
      ? getUrlForGeolocation() + `${location.geolocation[0]},${location.geolocation[1]}`
      : undefined;
  }

  getJpdgaInfo(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.jpdga || !event.jpdga.eventId) {
      return undefined;
    }
    return `http://www.jpdga.jp/event.php?tno=${event.jpdga.eventId}`;
  }

  getJpdgaResult(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.jpdga || !event.jpdga.eventId) {
      return undefined;
    }
    return `http://www.jpdga.jp/result.php?tno=${event.jpdga.eventId}`;
  }

  getPdgaResult(eventName: string): string | undefined {
    const event = EVENTS[getKeyFromName(eventName)];
    if (!event || !event.pdga || !event.pdga.eventId) {
      return undefined;
    }
    return `https://www.pdga.com/tour/event/${event.pdga.eventId}`;
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
  const eventName = /the(\d+)(st|nd|rd|th)(.+)/;
  const stripedName = name.trim().toLowerCase().replace(/[ -]/g, '');
  const results = stripedName.match(eventName);
  if (!results || results.length !== 4) {
    return undefined;
  }
  return {
    count: results[1],
    key: results[3]
  };
}
