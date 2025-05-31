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
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <SearchBarAutoComplete
            value={filters.query}
            onChange={handleQueryChange}
            onSearch={handleSearch}
            suggestions={suggestions}
            isLoading={isFetchingSuggestions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="search-button flex-1"
            onClick={handleSearch}
            disabled={isSearching || !filters.query.trim()}
          >
            {isSearching ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Buscando...</span>
              </div>
            ) : (
              'Buscar'
            )}
          </button>
          <button
            className="clear-button flex-1"
            onClick={handleClearFilters}
            disabled={isSearching}
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;