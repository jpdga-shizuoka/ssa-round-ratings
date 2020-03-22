export type EventCategory = 'upcoming' | 'past' | 'local' | 'monthly';

export interface MarkerDialogData {
  category: EventCategory;
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  events: string[];
}

export class GeoMarker {
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  title: string;
}

export interface LocationInfo {
  geolocation: [number, number];
  prefecture: string;
}

export interface PdgaInfo {
  eventId?: string;
}

export interface JpdgaInfo {
  eventId?: string;
  topicId?: string;
  photoId?: string;
}

export enum UrlType {
  Video = 'video',
  Photo = 'photo',
  Website = 'website',
}

export interface UrlInfo {
  type: string;
  title: string;
  url: string;
}

export interface EventInfo {
  title?: string;
  period?: {
    from: string;
    to: string;
  };
  location: string;     // location of the course
  pdga?: PdgaInfo;
  jpdga?: JpdgaInfo;
  website?: string;     // url of the event
  urls?: UrlInfo[];
  category?: string;
  schedule?: Schedule;
  players?: {
    pro: number;
    ama: number;
    misc: number;
  }
}

export interface Schedule {
  byDay: string[];      // byDay: ['su', 'mo'], // repeat only sunday and monday
  bySetPos: number;     // bySetPos: 3, // repeat every 3rd sunday (will take the first element of the byDay array)
  byMonth?: number[];   // byMonth: [1, 2], // repeat only in january und february,
}

export interface RoundInfo {
  event: string;        // Event Name
  round: string;        // Round Name
  date: string;         // Date of Round
  hla?: number;         // Hole Length Average (m)
  holes: number;        // number of holes
  ratings?: {
      player1: {
          score: number;  // Round score
          rating: number; // PDGA Player Rating
      };
      player2: {
          score: number;  // Round score
          rating: number; // PDGA Player Rating
      };
  };
  ssa?: number;         // Scratch Scoring Average
  category?: string;    // SSA Range Category
  weight?: number;
  offset?: number;
}

export interface TermDescription {
  term: string;
  description: string;
}

export const ICONS = {
  video: 'ondemand_video',
  photo: 'camera_alt',
  website: 'public'
};

export interface MiscInfo {
  icon: string;
  title: string;
  url: string;
}
