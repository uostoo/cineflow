import React, { useState, useEffect, useCallback } from 'react';
import { fetchGenres, getMovieSuggestions } from '../services/movieApi';
import { SearchFilters, Genre } from '../types/movie';
import SearchBarDropdown from './SearchBarDropdown';
import SearchBarAutoComplete from './SearchBarAutoComplete';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  isSearching?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isSearching = false,
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    genre: '',
    year: '',
    rating: '',
  });
  const [genres, setGenres] = useState<Array<{ value: string; label: string }>>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Generate years from 2000 to 2024
  const years = Array.from({ length: 25 }, (_, i) => {
    const year = 2024 - i;
    return { value: year.toString(), label: year.toString() };
  });

  // Rating options
  const ratings = [
    { value: 'all', label: 'Todos' },
    { value: '9', label: '9+' },
    { value: '8', label: '8+' },
    { value: '7', label: '7+' },
    { value: '6', label: '6+' },
    { value: '5', label: '5+' },
  ];

  // Fetch genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      const formattedGenres = [
        { value: 'all', label: 'Todos' },
        ...genreData.map((genre: Genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        })),
      ];
      setGenres(formattedGenres);
    };

    loadGenres();
  }, []);

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    async (query: string) => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsFetchingSuggestions(true);
      const results = await getMovieSuggestions(query);
      setSuggestions(results);
      setIsFetchingSuggestions(false);
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.query) {
        debouncedFetchSuggestions(filters.query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.query, debouncedFetchSuggestions]);

  const handleSearch = () => {
    if (filters.query.trim()) {
      onSearch(filters);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      genre: '',
      year: '',
      rating: '',
    });
    setSuggestions([]);
  };

  const handleQueryChange = (query: string) => {
    setFilters({ ...filters, query });
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Área de Busca
        </h2>
        
        <div className="w-full glass-effect p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <SearchBarAutoComplete
                value={filters.query}
                onChange={handleQueryChange}
                onSearch={handleSearch}
                suggestions={suggestions}
                isLoading={isFetchingSuggestions}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <SearchBarDropdown
                  label="Gênero"
                  options={genres}
                  value={filters.genre}
                  onChange={(value) => setFilters({ ...filters, genre: value })}
                />
              </div>
              <div>
                <SearchBarDropdown
                  label="Ano"
                  options={[{ value: 'all', label: 'Todos' }, ...years]}
                  value={filters.year}
                  onChange={(value) => setFilters({ ...filters, year: value })}
                />
              </div>
              <div>
                <SearchBarDropdown
                  label="Classificação"
                  options={ratings}
                  value={filters.rating}
                  onChange={(value) => setFilters({ ...filters, rating: value })}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleSearch}
                disabled={isSearching || !filters.query.trim()}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span>Buscando...</span>
                  </div>
                ) : (
                  'Buscar Filmes'
                )}
              </button>
              <button
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleClearFilters}
                disabled={isSearching}
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
