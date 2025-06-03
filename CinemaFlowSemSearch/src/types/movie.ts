
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  rating: string;
}
