
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        console.log('Buscando filmes populares...');
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=cf6ec6ffbab96b9197ffb9188ffaa4c2&language=pt-BR`
        );
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Filmes populares recebidos:', data.results?.length || 0);
        
        setMovies(data.results || []);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar filmes:', err);
        setError('Erro ao carregar filmes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Filmes Populares
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="glass-effect rounded-xl overflow-hidden">
                  <div className="aspect-[2/3] bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Filmes Populares
          </h2>
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-fade-in">
          Filmes Populares
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.slice(0, 20).map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMovies;
