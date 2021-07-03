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

export function getLayout(id?: string): string | undefined {
  return id ? `https://jpdga-shizuoka.github.io/maps/event/${id}` : undefined;
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
