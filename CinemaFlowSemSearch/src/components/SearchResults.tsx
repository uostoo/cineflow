
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';

interface SearchResultsProps {
  movies: Movie[];
  isLoading: boolean;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  movies,
  isLoading,
  searchQuery,
}) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Resultados da Busca
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

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Resultados da Busca
        </h2>
        {searchQuery && (
          <p className="text-gray-300 text-center mb-12">
            Mostrando resultados para: <span className="text-blue-400">"{searchQuery}"</span>
          </p>
        )}
        
        {movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">Nenhum filme encontrado</h3>
            <p className="text-gray-400">Tente ajustar seus filtros de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
