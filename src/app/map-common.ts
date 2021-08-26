import { EventId } from './models';

export interface GeoMarker {
  position: {
    lat: number;
    lng: number;
  };
  eventId: EventId;
  location: string;
  title: string;
}
