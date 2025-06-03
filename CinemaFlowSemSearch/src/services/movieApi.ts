
const API_KEY = 'cf6ec6ffbab96b9197ffb9188ffaa4c2';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    return data.genres || [];
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    return [];
  }
};

export const getMovieSuggestions = async (query: string): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results?.slice(0, 5).map((movie: any) => movie.title) || [];
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    return [];
  }
};

export const searchMovies = async (filters: any) => {
  try {
    let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(filters.query)}`;
    
    if (filters.year && filters.year !== 'all') {
      url += `&year=${filters.year}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    let results = data.results || [];
    
    // Filter by genre if specified
    if (filters.genre && filters.genre !== 'all') {
      results = results.filter((movie: any) => 
        movie.genre_ids?.includes(parseInt(filters.genre))
      );
    }
    
    // Filter by rating if specified
    if (filters.rating && filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      results = results.filter((movie: any) => movie.vote_average >= minRating);
    }
    
    return results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};
