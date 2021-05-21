export function getJpdgaInfo(eventId: string): string | undefined {
  return eventId
    ? `http://www.jpdga.jp/event.php?tno=${eventId}`
    : undefined;
}

export function getJpdgaResult(eventId: string): string | undefined {
  return eventId
    ? `http://www.jpdga.jp/result.php?tno=${eventId}`
    : undefined;
}

export function getJpdgaReport(topicId: string): string | undefined {
  return topicId
    ? `http://www.jpdga.jp/main/index.php?itemid=${topicId}`
    : undefined;
}

export function getJpdgaPhoto(photoId: string): string | undefined {
  return photoId
    ? `https://www.flickr.com/photos/jpdga/albums/${photoId}`
    : undefined;
}

export function getPdgaResult(eventId: string): string | undefined {
  return eventId
    ? `https://www.pdga.com/tour/event/${eventId}`
    : undefined;
}

export function getLiveScore(id: string): string | undefined {
  return id
    ? `https://www.pdga.com/apps/tournament/live/event?eventId=${id}`
    : undefined;
}

export function getLayout(id: string): string | undefined {
  return id
    ? `https://jpdga-shizuoka.github.io/maps/event/${id}`
    : undefined;
}

export function getEventTitle(name?: string): string {
  if (!name) {
    return name;
  }
  const eventName = /the (\d+)(st|nd|rd|th|) (.+)/;
  const results = name.trim().toLowerCase().match(eventName);
  return (!results || results.length !== 4)
    ? name
    : results[3];
}
