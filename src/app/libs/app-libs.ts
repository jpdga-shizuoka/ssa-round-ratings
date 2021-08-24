import { RoundInfo, EventInfo } from '../models';
import { ICONS, MiscInfo } from '../app-common';

export function getJpdgaInfo(eventId?: string): string {
  return `http://www.jpdga.jp/event.php?tno=${eventId ?? ''}`;
}

export function getJpdgaResult(eventId?: string): string {
  return `http://www.jpdga.jp/result.php?tno=${eventId ?? ''}`;
}

export function getJpdgaReport(topicId?: string): string {
  return `http://www.jpdga.jp/main/index.php?itemid=${topicId ?? ''}`;
}

export function getJpdgaPhoto(photoId?: string): string {
  return `https://www.flickr.com/photos/jpdga/albums/${photoId ?? ''}`;
}

export function getPdgaResult(eventId?: string): string {
  return `https://www.pdga.com/tour/event/${eventId ?? ''}`;
}

export function getLiveScore(id?: string): string {
  return `https://www.pdga.com/apps/tournament/live/event?eventId=${id ?? ''}`;
}

export function getCbjUrl(id: string): string {
  return `https://jpdga-shizuoka.github.io/maps/event/${id}`;
}

export function getEventTitle(name?: string): string {
  if (!name) {
    return '';
  }
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
  const results = eventName.exec(name.trim().toLowerCase());
  return (!results || results.length !== 4)
    ? name
    : results[3];
}

export function calcRoundStat(rounds: RoundInfo[]): RoundInfo[] {
  for (const round of rounds) {
    if (round.ratings) {
      round.weight = calcWeight(round.ratings.player1, round.ratings.player2);
      round.offset = calcOffset(round);
      round.ssa = calcSsa(round);
      round.category = calcCategory(round.ssa);
      round.difficulty = calcDifficulty(round);
    }
  }
  return rounds;
}

export function calcDifficulty(round: RoundInfo): number | undefined {
  if (!round.hla || !round.ssa) {
    return undefined;
  }
  return Math.round(round.ssa / round.hla * 100) / 10;
}

export function calcWeight(player1: { score: number, rating: number }, player2: { score: number, rating: number }) {
  return (player1.rating - player2.rating) / (player1.score - player2.score);
}

export function calcOffset(round: RoundInfo) {
  if (!round.ratings || !round.weight) {
    return 0;
  }
  return round.ratings.player1.rating - round.weight * round.ratings.player1.score;
}

export function calcSsa(round: RoundInfo) {
  if (!round.offset || !round.weight) {
    return 0;
  }
  const holes = round.holes || 18;
  const regulation = holes / 18;
  return (1000 - round.offset) / round.weight / regulation;
}

export function calcCategory(ssa: number) {
  if (ssa < 48) {
    return 'A';
  } else if (ssa < 54) {
    return '2A';
  } else if (ssa < 60) {
    return '3A';
  } else if (ssa < 66) {
    return '4A';
  } else {
    return '5A';
  }
}

export function makeMiscInfo(event: EventInfo): MiscInfo[] {
  const info: MiscInfo[] = [];
  if (event.urls) {
    for (const urlInfo of event.urls) {
      if (urlInfo.type === 'video') {
        continue;
      }
      info.push({
        icon: ICONS[urlInfo.type],
        title: urlInfo.title,
        url: urlInfo.url
      });
    }
  }
  return info;
}

export function makeVideoInfo(event: EventInfo): MiscInfo[] {
  const info: MiscInfo[] = [];
  if (event?.urls) {
    for (const urlInfo of event.urls) {
      if (urlInfo.type !== 'video') {
        continue;
      }
      info.push({
        icon: ICONS[urlInfo.type],
        title: urlInfo.title,
        date: new Date(event.period?.from ?? 0),
        url: urlInfo.url
      });
    }
  }
  return info;
}

export function makePdgaInfo(event: EventInfo): MiscInfo[] {
  const info: MiscInfo[] = [];
  if (event.pdga?.eventId) {
    info.push({
      icon: 'public',
      title: 'Results',
      url: getPdgaResult(event.pdga.eventId)
    });
  }
  if (event.pdga?.scoreId) {
    info.push({
      icon: 'public',
      title: 'Live Score',
      url: getLiveScore(event.pdga.scoreId)
    });
  }
  return info;
}

export function makeJpdgaInfo(event: EventInfo): MiscInfo[] {
  const info: MiscInfo[] = [];
  if (isPastEvent(event)) {
    if (event.jpdga?.eventId) {
      info.push({
        icon: 'public',
        title: 'Results',
        url: getJpdgaResult(event.jpdga.eventId)
      });
    }
    if (event.jpdga?.topicId) {
      info.push({
        icon: 'public',
        title: 'Report',
        url: getJpdgaReport(event.jpdga.topicId)
      });
    }
  }
  if (event.jpdga?.eventId) {
    info.push({
      icon: 'public',
      title: 'Paper',
      url: getJpdgaInfo(event.jpdga.eventId)
    });
  }
  return info;
}

export function isPastEvent(event: EventInfo): boolean {
  const eventDate = new Date(event.period?.to ?? 0);
  const nowDate = new Date();
  return eventDate.getTime() < nowDate.getTime();
}