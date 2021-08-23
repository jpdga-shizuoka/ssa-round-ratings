import {
  RoundInfo, EventInfo, EventCategory, TotalYearPlayers, Players, RoundId
} from '../models';

const CATEGORY2FILE = {
  alltime: 'events',
  upcoming: 'events',
  past: 'events',
  video: 'events',
  local: 'local-events',
  monthly: 'monthly-events'
};

export function category2url(category: EventCategory) {
  return `assets/models/${CATEGORY2FILE[category]}.json`;
}

export function compareByDate(a: Date, b: Date): number {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}

export function compareTime(t1: Date, category: EventCategory) {
  const t2 = new Date();
  switch (category) {
    case 'past': {
      t2.setDate(t2.getDate() + 1);
      return t1.getTime() < t2.getTime();
    }
    case 'upcoming': {
      t2.setDate(t2.getDate() - 7);
      return t1.getTime() > t2.getTime();
    }
    case 'local': {
      t2.setDate(t2.getDate() - 1);
      return t1.getTime() > t2.getTime();
    }
    case 'monthly': {
      return t1.getTime() > t2.getTime();
    }
    default:
      return true;
  }
}

export function upcomingFilter(events: EventInfo[], category: EventCategory): EventInfo[] {
  if (category === 'monthly' || category === 'alltime') {
    return events;
  }
  // if (category !== 'upcoming' && category !== 'local') {
  //   return events;
  // }
  const result: EventInfo[] = [];
  events.forEach(event => {
    if (compareTime(new Date(event.period?.to ?? 0), category)) {
      result.push(event);
    }
  });
  return result;
}

export function sortEvents(events: EventInfo[], category: EventCategory): EventInfo[] {
  if (category === 'monthly') {
    return events;
  }
  events.sort((a, b) => {
    if (!a.period || !b.period) {
      return 0;
    }
    const t1 = new Date(a.period.from);
    const t2 = new Date(b.period.from);
    if (category === 'past') {
      return t2.getTime() - t1.getTime();
    } else {
      return t1.getTime() - t2.getTime();
    }
  });
  return events;
}

type AnualPlayers = {
  [year: number]: Players;
}

class CEventInfo {
  constructor(private event: EventInfo) { }
  get year(): number {
    const date = new Date(this.event.period?.from ?? 0);
    return date.getFullYear();
  }
}

class CTotalYearPlayers {
  private annualPlayers: AnualPlayers = {};

  add(year: number, players: Players) {
    if (!this.annualPlayers[year]) {
      this.annualPlayers[year] = {
        pro: 0,
        ama: 0,
        misc: 0
      };
    }
    this.annualPlayers[year].pro += players.pro;
    this.annualPlayers[year].ama += players.ama;
    this.annualPlayers[year].misc += players.misc;
  }

  get result(): TotalYearPlayers[] {
    const result: TotalYearPlayers[] = [];

    Object.keys(this.annualPlayers).forEach(key => {
      const year = parseInt(key, 10);
      result.push({
        year: year,
        players: this.annualPlayers[year]
      });
    });
    return result;
  }
}

export function countPlayers(events: EventInfo[]): TotalYearPlayers[] {
  const total = new CTotalYearPlayers();
  events.forEach(event => {
    if (event.players) {
      const info = new CEventInfo(event);
      total.add(info.year, event.players);
    }
  });
  return total.result;
}

export function filterByList(rounds: RoundInfo[], list?: RoundId[]): RoundInfo[] {
  return list ? rounds.filter(round => list.includes(round.id)) : rounds;
}
