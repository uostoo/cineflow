
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import PopularMovies from '../components/PopularMovies';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { SearchFilters, Movie } from '../types/movie';
import { searchMovies } from '../services/movieApi';

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const handleSearch = async (filters: SearchFilters) => {
    console.log('Iniciando busca com filtros:', filters);
    setIsSearching(true);
    setHasSearched(true);
    setCurrentSearchQuery(filters.query);
    
    try {
      const results = await searchMovies(filters);
      console.log('Resultados da busca:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBackToPopular = () => {
    setHasSearched(false);
    setSearchResults([]);
    setCurrentSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
          
          {hasSearched ? (
            <>
              <div className="text-center mb-8">
                <button
                  onClick={handleBackToPopular}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Voltar aos Filmes Populares
                </button>
              </div>
              <SearchResults 
                movies={searchResults} 
                isLoading={isSearching}
                searchQuery={currentSearchQuery}
              />
            </>
          ) : (
            <PopularMovies />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
