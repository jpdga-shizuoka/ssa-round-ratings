const REMOVE_PATERN = /[ \-.,()]/g;

export interface EventParts {
  count?: number;
  key: string;
}

export function name2key(name: string): string {
  return name.trim().toLowerCase().replace(REMOVE_PATERN, '');
}

export function event2key(name?: string): EventParts | undefined {
  if (!name) {
    return undefined;
  }
  const n = name.trim().toLowerCase();
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
  const altEventName = /the (.+)/;

  let results = eventName.exec(n);
  if (results == null) {
    results = altEventName.exec(n);
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

export function title2name(name?: string): string {
  const keys = event2key(name);
  return keys == null ? '' : keys.key;
}