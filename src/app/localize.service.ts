import { Injectable } from '@angular/core';
import { name2key, event2key } from './libs/event.lib';

import { environment } from '../environments/environment';
import EVENT from '../assets/local/event-aliase-dictionary.json';
import LOCATION from '../assets/local/location-aliase-dictionary.json';
import MENU from '../assets/local/menu-aliase-dictionary.json';
import PREFECTURE from '../assets/local/prefecture-aliase-dictionary.json';

export type Language = 'global' | 'local';
export const GLOBAL = 'global' as Language;
export const LOCAL = 'local' as Language;

type Dictionary = { [string: string]: string; };
const DICTIONARIES = [
  EVENT as Dictionary,
  LOCATION as Dictionary,
  MENU as Dictionary,
  PREFECTURE as Dictionary
];
export type LocalizationCategory = 'event' | 'location' | 'menu' | 'prefecture';

interface LocalizeTable {
  aliase2title?: (count: number, aliase: string) => string;
}
const LOCALIZE_TABLE = {} as LocalizeTable;
const defaultLang = environment.language ?? 'en';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {
  language = LOCAL;

  get isGlobal(): boolean {
    return this.language === GLOBAL;
  }

  constructor() {
    prepareLocals();
  }

  transform(value?: string, lc?: LocalizationCategory): string {
    if (!value) {
      return '';
    }
    if (this.isGlobal) {
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

  toggleLanguage(): void {
    this.language = this.isGlobal ? LOCAL : GLOBAL;
    document.documentElement.lang = this.language === GLOBAL ? 'en' : defaultLang;
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
  if (!environment.localize) {
    return;
  }
  const localize = environment.localize;
  Object.keys(localize).forEach(key => {
    switch (key) {
      case 'aliase2title': {
        const aliase2title = localize.aliase2title;
        if (aliase2title) {
          // @todo
          // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
          LOCALIZE_TABLE.aliase2title = new Function(...aliase2title) as (count: number, aliase: string) => string;
        }
      }
    }
  });
}

function event2local(eventName: string): string {
  const Event = EVENT as Dictionary;
  const parts = event2key(eventName);
  if (!parts) {
    const title = Event[name2key(eventName)];
    return !title ? eventName : title;
  }
  const aliase = Event[parts.key];
  if (!aliase) {
    return eventName;
  }
  if (parts.count == null) {
    return aliase;
  }
  if (!LOCALIZE_TABLE.aliase2title) {
    return eventName;
  }
  return LOCALIZE_TABLE.aliase2title(parts.count, aliase);
}
