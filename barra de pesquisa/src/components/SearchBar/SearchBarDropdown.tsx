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
        className="search-input flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-[#E0E0E0]' : 'text-[#9E9E9E]'}`}>
          {selectedOption}
        </span>
        <ChevronDown 
          className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </div>
      
      {isOpen && (
        <div className="dropdown-container absolute z-10 mt-1 max-h-60 w-full overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-option"
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