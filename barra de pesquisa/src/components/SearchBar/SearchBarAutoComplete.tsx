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
          className="search-input pl-10"
          placeholder="Buscar filmes..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9E9E9E]">
          <Search size={18} />
        </div>
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#0466C8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="dropdown-container absolute z-20 mt-1 w-full"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="dropdown-option"
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