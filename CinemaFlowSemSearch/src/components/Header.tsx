
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <span className="text-blue-400">Filmes</span>
            <span className="text-purple-400">+</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
              Início
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Filmes
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Séries
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Lançamentos
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-blue-400 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-3 pt-4">
              <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                Início
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Filmes
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Séries
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Lançamentos
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
