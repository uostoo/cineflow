export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  rating: string;
}