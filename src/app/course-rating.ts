export interface CourseRatingsItem {
  id: number;           // Event ID managed by PDGA
  jpdga?: number;       // Event ID managed by JPDGA
  continent: string;
  country: string;
  event: string;        // Event Name
  round: string;        // Round Name
  date: string;         // Date of Round
  hla?: number;         // Hole Length Average (m)
  holes: number;        // number of holes
  ratings: {
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
  rssa?: number;        // Regulated Scratch Scoring Average
  weight?: number;
  offset?: number;
}
