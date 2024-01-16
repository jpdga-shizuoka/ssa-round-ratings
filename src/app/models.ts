import { Observable } from 'rxjs';

export type EventCategory = 'alltime' | 'upcoming' | 'past' | 'local' | 'monthly' | 'video';
export type EventId = string;
export type RoundId = string;
export type LocationId = string;
export interface Period {
  from: string;
  to: string;
}
export type GeoPosition = [number, number];

export interface LocationSearch {
  category: EventCategory;
  key: string;
}

export interface EventGo {
  id: EventId;
}

export interface LocationInfo {
  id: LocationId;
  title: string;
  geolocation: GeoPosition;
  prefecture: string;
  weather?: string;
}

export interface PdgaInfo {
  eventId?: string;
  scoreId?: string;
}

export interface JpdgaInfo {
  eventId?: string;
  topicId?: string;
  photoId?: string;
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

export interface Layouts {
  official?: string;
  cbj?: string;
}

export interface ProBudget {
  entreefee: number;  // JPY
  purse: number;      // Pro Purse, USD
  rate: number;       // JPY/USD
  paidout: number;    // Players paid out
  totalprize?: number;  // Pro Purse, JPY
  prizeratio?: number;  // Pro Payout % of Entry Fees
  paidratio?: number;   // % Players paid out
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
  layout?: Layouts;
  rounds?: RoundId[];
  budget?: ProBudget;
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

export interface RoundInfoBase {
  id: RoundId;
  event: EventId;       // Event Id
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
}

export interface RoundInfo extends RoundInfoBase {
  eventTitle: string;
  locationTitle?: string;
  event$?: Observable<EventInfo>;
  ssa?: number;         // Scratch Scoring Average
  ssaRaw?: number;      // raw ssa (not regulated)
  difficulty?: number;
  category?: string;    // SSA Range Category
  weight?: number;
  offset?: number;
}

export interface TotalYearPlayers {
  year: number;
  players: Players;
}

export type Organization = 'PDGA' | 'JPDGA';

export interface Members {
  year: number;
  members: number;
}

export interface AnnualReport {
  year: number;
  url: string;
}
