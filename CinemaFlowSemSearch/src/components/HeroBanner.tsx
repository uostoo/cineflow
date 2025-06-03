
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/5hoS3nEkGGXUfmnu39yw1k52JX5.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Descubra o
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Extraordinário</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Explore os filmes mais populares e emocionantes do momento. 
            Uma experiência cinematográfica única aguarda por você.
          </p>
          
          <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            Ver mais
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
    </section>
  );
};

export default HeroBanner;
