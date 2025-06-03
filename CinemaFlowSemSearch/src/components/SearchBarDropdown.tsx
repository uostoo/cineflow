
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SearchBarDropdownProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value)?.label || label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full px-6 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700/80 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-white' : 'text-gray-400'}`}>
          {selectedOption}
        </span>
        <ChevronDown 
          className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-2xl shadow-xl max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-6 py-3 text-white hover:bg-gray-700/80 cursor-pointer transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarDropdown;
