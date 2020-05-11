import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export type EventCategory = 'upcoming' | 'past' | 'local' | 'monthly' | 'video';
export type EventId = string;
export type RoundId = string;
export type LocationId = string;
export type Period = {
  from: string;
  to: string;
};
export type GeoPosition = [number, number];

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
  id: LocationId;
  title: string;
  geolocation: GeoPosition;
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

export interface Players {
  pro: number;
  ama: number;
  misc: number;
}

export interface EventInfo {
  id: EventId;
  title?: string;
  period?: Period;
  location: LocationId;
  location$?: Observable<LocationInfo>;
  status?: string;
  pdga?: PdgaInfo;
  jpdga?: JpdgaInfo;
  website?: string;     // url of the event
  urls?: UrlInfo[];
  category?: string;
  schedule?: Schedule;
  players?: Players;
}

export interface VideoInfo {
  title: string;
  subttl: string;
  date: Date;
  url: string;
}

export interface Schedule {
  byDay: string[];      // byDay: ['su', 'mo'], // repeat only sunday and monday
  bySetPos: number;     // bySetPos: 3, // repeat every 3rd sunday (will take the first element of the byDay array)
  byMonth?: number[];   // byMonth: [1, 2], // repeat only in january und february,
}

export interface RoundInfo {
  id: RoundId;
  event: EventId;       // Event Id
  event$?: Observable<EventInfo>;
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

export interface TotalYearPlayers {
  year: number;
  players: Players;
}

export interface PastLists {
  players: TotalYearPlayers[];
  videos: VideoInfo[];
}

export interface MetaData {
  title: string;
  type?: string;
  url?: string;
  image?: string;
  description?: string;
  keywords?: string;
}

export interface MetaDescription {
  ngActivatedRoute: ActivatedRoute;
  ngTitle: Title;
  ngMeta: Meta;
  ngRouter: Router;
}
