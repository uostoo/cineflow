import { Genre, Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  'Content-Type': 'application/json'
};

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?language=pt-BR`,
      { headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch genres: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const searchMovies = async (
  query: string,
  genre?: string,
  year?: string,
  rating?: string
): Promise<Movie[]> => {
  try {
    let url = `${BASE_URL}/search/movie?language=pt-BR&query=${encodeURIComponent(
      query
    )}&include_adult=false`;
    
    if (year) {
      url += `&primary_release_year=${year}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch movies: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    let results = data.results.map((movie: any) => ({
      ...movie,
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null
    }));
    
    // Client-side filtering for genre and rating
    if (genre && genre !== 'all') {
      const genreId = parseInt(genre);
      results = results.filter((movie: Movie) => 
        movie.genre_ids.includes(genreId)
      );
    }
    
    if (rating && rating !== 'all') {
      const minRating = parseInt(rating);
      results = results.filter((movie: Movie) => 
        movie.vote_average >= minRating
      );
    }
    
    return results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieSuggestions = async (query: string): Promise<string[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?language=pt-BR&query=${encodeURIComponent(
        query
      )}&include_adult=false&page=1`,
      { headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch suggestions: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.results
      .slice(0, 5)
      .map((movie: Movie) => movie.title);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};