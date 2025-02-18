import { Link } from "react-router-dom";
import { MovieDetails } from "../types";
import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  movie: MovieDetails;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block relative">
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg hover:scale-105 transition">
        {/* IMDb Rating Box */}
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-lg flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-semibold">
            {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
          </span>
        </div>

       
        <img src={movie.Poster} alt={movie.Title} className="w-full h-72 object-cover rounded" />

      
        <h2 className="text-lg font-semibold mt-2">{movie.Title} ({movie.Year})</h2>
      </div>
    </Link>
  );
}
