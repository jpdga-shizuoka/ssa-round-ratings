export interface CourseLocation {
  geolocation: [number, number];
  prefecture: string;
}

export interface PdgaInfo {
  eventId?: string;
}

export interface JpdgaInfo {
  eventId: string;
  topicId?: string;
  photoId?: string;
}

export enum UrlType {
  Video = 'video',
  Photo = 'photo',
  Website = 'website',
}

export interface UrlInfo {
  type: UrlType;
  title: string;
  url: string;
}

export interface EventInfo {
  location: string;     // location of the course
  pdga?: PdgaInfo;
  jpdga?: JpdgaInfo;
  website?: string;     // url of the event
  urls?: UrlInfo[];
  date?: string;        // ?????? temporally
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
