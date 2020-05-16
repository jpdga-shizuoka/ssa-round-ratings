import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import EVENT from '../assets/local/event-aliase-dictionary.json';
import LOCATION from '../assets/local/location-aliase-dictionary.json';
import MENU from '../assets/local/menu-aliase-dictionary.json';
import PREFECTURE from '../assets/local/prefecture-aliase-dictionary.json';

export type Language = 'global' | 'local';
export const GLOBAL = 'global' as Language;
export const LOCAL = 'local' as Language;

const REMOVE_PATERN = /[ \-\.\,\(\)]/g;
const DICTIONARIES = [
  EVENT,
  LOCATION,
  MENU,
  PREFECTURE,
];
export type LocalizationCategory = 'event' | 'location' | 'menu' | 'prefecture';

interface EventParts {
  count: number;
  key: string;
}

interface LocalizeTable {
  distanseFromMarkerToGoal?: (distanse: string, marker: string) => string;
  aliase2title?: (count: number, aliase: string) => string;
}
const LOCALIZE_TABLE = {} as LocalizeTable;

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  language = LOCAL;

  get isGlobal() {
    return this.language === GLOBAL;
  }

  constructor() {
    prepareLocals();
  }

  transform(value?: string, lc?: LocalizationCategory): string {
    if (!value || this.isGlobal) {
      return value;
    }
    let result = value;
    for (const dict of getDictionaries(lc)) {
      const local = dict[name2key(value)];
      if (local) {
        result = local;
        break;
      }
    }
    if (value === result) {
      return event2local(value);
    } else {
      return result;
    }
  }

  distanseFromMarkerToGoal(distanse: string, marker: string) {
    if (this.isGlobal || !LOCALIZE_TABLE.distanseFromMarkerToGoal) {
      return `${distanse} to goal from the ${marker.toLowerCase()}`;
    } else {
      return LOCALIZE_TABLE.distanseFromMarkerToGoal(distanse, marker);
    }
  }

  toggleLanguage() {
    this.language = this.isGlobal ? LOCAL : GLOBAL;
  }
}

function getDictionaries(lc?: LocalizationCategory) {
  switch (lc) {
    case 'event':
      return [EVENT];
    case 'location':
      return [LOCATION];
    case 'menu':
      return [MENU];
    case 'prefecture':
      return [PREFECTURE];
    default:
      return DICTIONARIES;
  }
}

function prepareLocals() {
  Object.keys(environment.localize)
    .forEach(name => LOCALIZE_TABLE[name]
      = new Function(...environment.localize[name]));
}

function event2local(eventName: string): string {
  const parts = event2key(eventName);
  if (!parts) {
    const title = EVENT[name2key(eventName)];
    return title ? title : eventName;
  }
  const aliase = EVENT[parts.key];
  if (!aliase) {
    return eventName;
  }
  if (parts.count == null) {
    return aliase;
  }
  return LOCALIZE_TABLE.aliase2title(parts.count, aliase);
}

function name2key(name: string): string {
  return name.trim().toLowerCase().replace(REMOVE_PATERN, '');
}

function event2key(name?: string): EventParts | undefined {
  if (!name) {
    return undefined;
  }
  const n = name.trim().toLowerCase();
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
  const altEventName = /the (.+)/;

  let results = n.match(eventName);
  if (results == null) {
    results = n.match(altEventName);
    if (results == null) {
      return undefined;
    }
    if (results.length !== 2) {
      return undefined;
    }
    return {
      count: undefined,
      key: results[1].replace(REMOVE_PATERN, '')
    };
  } else if (results.length !== 4) {
    return undefined;
  }
  return {
    count: parseInt(results[1], 10),
    key: results[3].replace(REMOVE_PATERN, '')
  };
}
