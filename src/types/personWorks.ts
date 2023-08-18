export interface PersonWorksProp {
  id: number;
  cast: [
    {
      adult: boolean;
      backdrop_path: null;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
      order: number;
      media_type: string;
    }
  ];
  crew: [
    {
      adult: boolean;
      backdrop_path: null;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
      order: number;
      media_type: string;
      department: string;
      job: string;
    }
  ];
}