
import React from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.svg';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <div className="group movie-card-hover cursor-pointer">
      <div className="relative overflow-hidden rounded-xl glass-effect">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm font-medium">{year}</span>
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
            {movie.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
