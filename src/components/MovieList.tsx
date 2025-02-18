import MovieCard from "./MovieCard";
import { MovieDetails } from "../types";

interface MovieListProps {
  movies: MovieDetails[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
