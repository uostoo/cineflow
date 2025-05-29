import React, { useEffect, useState } from 'react';
import { ArrowRight, Film, Info, Heart, Navigation } from 'lucide-react';

const LandingHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const moviePosters = [
    'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', // Oppenheimer
    'https://image.tmdb.org/t/p/w500/A7EByudX0eOzlkQ2FIbogzyazm2.jpg', // Barbie
    'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', // Avatar
    'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', // The Shawshank Redemption
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-[#E0E0E0]">
        <div 
          className={`max-w-4xl mx-auto px-6 py-12 text-center transition-opacity duration-1000 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#E0E0E0]">
            CineFlow
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-[#9E9E9E]">
            A plataforma definitiva para descobrir e explorar o universo cinematográfico
          </p>
          
          <a 
            href="/home" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-[#0466C8] text-[#E0E0E0] hover:bg-opacity-80 transition-all duration-300 mb-16"
          >
            Explorar Filmes
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Descubra Filmes</h3>
              <p className="text-[#9E9E9E]">
                Encontre novos filmes baseados em seus gostos e preferências pessoais
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Assista Trailers</h3>
              <p className="text-[#9E9E9E]">
                Visualize trailers em alta definição antes de decidir o que assistir
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Conheça o Elenco</h3>
              <p className="text-[#9E9E9E]">
                Explore informações detalhadas sobre atores e equipe de produção
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose CineFlow Section */}
      <div className="py-24 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#E0E0E0] mb-4">
            Por Que Escolher CineFlow?
          </h2>
          <p className="text-xl text-[#9E9E9E] text-center mb-16">
            Sua jornada cinematográfica começa aqui.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 text-center">
              <Film className="w-12 h-12 text-[#0466C8] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Variedade Ilimitada</h3>
              <p className="text-[#9E9E9E]">
                Explore um catálogo vasto de filmes de todos os gêneros e épocas.
              </p>
            </div>

            <div className="p-6 text-center">
              <Info className="w-12 h-12 text-[#0466C8] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Informações Completas</h3>
              <p className="text-[#9E9E9E]">
                Acesse sinopses, trailers, elenco e avaliações em um só lugar.
              </p>
            </div>

            <div className="p-6 text-center">
              <Heart className="w-12 h-12 text-[#0466C8] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Experiência Personalizada</h3>
              <p className="text-[#9E9E9E]">
                Descubra recomendações baseadas no seu gosto.
              </p>
            </div>

            <div className="p-6 text-center">
              <Navigation className="w-12 h-12 text-[#0466C8] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#E0E0E0]">Interface Intuitiva</h3>
              <p className="text-[#9E9E9E]">
                Navegue de forma simples e encontre o que procura rapidamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Movies Section */}
      <div className="py-24 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#E0E0E0] mb-4">
            Explore o Mundo do Cinema
          </h2>
          <p className="text-xl text-[#9E9E9E] text-center mb-16">
            De clássicos atemporais a lançamentos imperdíveis.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {moviePosters.map((poster, index) => (
              <div 
                key={index}
                className="relative aspect-[2/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={poster}
                  alt="Movie Poster"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-transparent hover:border-[#0466C8] rounded-lg transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#E0E0E0] mb-6">
            Comece Sua Descoberta Agora
          </h2>
          <p className="text-xl text-[#9E9E9E] mb-12">
            Milhares de filmes esperam por você. Clique abaixo e mergulhe no universo cinematográfico.
          </p>
          <a 
            href="/home" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-[#0466C8] text-[#E0E0E0] hover:bg-opacity-80 transition-all duration-300"
          >
            Explorar Filmes
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default LandingHero;