import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { SearchFilters } from './types/movie';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setSearchResults(JSON.stringify(filters, null, 2));
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            Buscador de Filmes
          </h1>
          <p className="text-text-secondary">
            Encontre informações sobre seus filmes favoritos
          </p>
        </header>

        <SearchBar onSearch={handleSearch} isSearching={isSearching} />

        {searchResults && (
          <div className="mt-8 p-4 bg-container rounded-lg">
            <h2 className="text-xl font-medium mb-4">Parâmetros de Busca:</h2>
            <pre className="bg-background p-4 rounded text-sm overflow-auto">
              {searchResults}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;