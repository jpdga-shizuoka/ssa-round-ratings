import { Injectable } from '@angular/core';

import COURSE_LOCATIONS from '../assets/course-location.json';
import PREFECTURES from '../assets/prefecture.json';
import EVENTS_NAME from '../assets/events.json';

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

  getEventAliase(name: string): string {
    if (this.primaryLanguage) {
      return name;
    }
    const parts = getEventKey(name);
    if (!parts) {
      return name;
    }
    const event = EVENTS_NAME[parts.key];
    if (!event) {
      return name;
    }
    return `第${parts.count}回 ${event}`;
  }

  getPrefectureAliase(name: string): string {
    if (this.primaryLanguage) {
      return name;
    }
    const prefecture = PREFECTURES[getKeyFromName(name)];
    return prefecture || name;
  }

  getCourseAliase(name: string): string {
    if (this.primaryLanguage) {
      return name;
    }
    const course = COURSE_LOCATIONS[getKeyFromName(name)];
    return (!course || !course.aliase)
      ? name
      : course.aliase;
  }

  getCourseGeolocation(name: string): string | undefined {
    const course = COURSE_LOCATIONS[getKeyFromName(name)];
    return course && course.geolocation
      ? getUrlForGeolocation() + `${course.geolocation[0]},${course.geolocation[1]}`
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
  const keys = name.split(',');
  return keys[0].toLowerCase().trim();
}

function getUrlForGeolocation(): string {
  return isAppleDevice()
    ? 'http://maps.apple.com/?ll='
    : 'https://maps.google.com/?q=';
}

function isAppleDevice(): boolean {
  return /iPhone|Macintosh/.test(window.navigator.userAgent);
}

function getEventKey(name: string): EventParts | undefined {
  const eventName = /the (\d+)(st|nd|rd|th) (.+)/;
  const results = name.trim().toLowerCase().match(eventName);
  if (!results || results.length !== 4) {
    return undefined;
  }
  return {
    count: results[1],
    key: results[3].replace(/ /g, '')
  };
}
