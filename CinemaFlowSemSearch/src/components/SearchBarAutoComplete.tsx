
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBarAutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  suggestions: string[];
  isLoading: boolean;
}

const SearchBarAutoComplete: React.FC<SearchBarAutoCompleteProps> = ({
  value,
  onChange,
  onSearch,
  suggestions,
  isLoading,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-6 py-4 pl-14 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-lg"
          placeholder="Digite o nome do filme que você procura..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        {isLoading && (
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-20 mt-2 w-full bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-2xl shadow-xl max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-6 py-3 text-white hover:bg-gray-700/80 cursor-pointer transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarAutoComplete;
