import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { MovieDetails } from "../types";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import theatre from "../assets/theatre.jpg"; // ✅ Using local image

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id!);
      if (data) setMovie(data);
      else setError("Movie details not found.");
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="relative w-full min-h-screen bg-[#0e1327] text-white">
      <Navbar />

      {/* Theatre Movie Background Banner with spacing & rounded corners  */}
      <div
        className="relative w-[95%] mx-auto mt-[10px] rounded-[2vw] h-60 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${theatre})` }} // local image
      >
        {/* Movie Title Box - Responsive Positioning */}
        <div className="absolute bottom-[-30px] sm:bottom-[-35px] md:bottom-[-40px] left-6 sm:left-8 md:left-10 bg-black/80 text-white px-5 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg">
          <p className="text-xs sm:text-sm text-gray-400">
            IMDb / {movie?.Type === "series" ? "TV Show" : "Movie"}
          </p>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {movie?.Title}
          </h1>
        </div>
      </div>

      {/* Movie Details Section - Responsive Layout  */}
      <div className="container mx-auto p-5 mt-16 sm:mt-20 md:mt-24 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left: Movie Poster  */}
        <img
          src={movie?.Poster}
          alt={movie?.Title}
          className="w-48 sm:w-56 md:w-64 lg:w-80 rounded-lg shadow-lg mx-auto md:mx-0"
        />

        {/* Right: Movie Information  */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-gray-300">
            {movie?.Plot.split(".")[0] + "."}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-4">
            {movie?.Plot}
          </p>

          {/* IMDb Rating  */}
          <div className="flex justify-center md:justify-start items-center mt-4">
            <div className="bg-black/70 text-yellow-400 px-3 py-1 rounded-lg flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold">{movie?.imdbRating}</span>
            </div>
          </div>

          {/* Type (Movie or TV Show)  */}
          <p className="mt-4">
            <span className="font-semibold text-gray-300">Type:</span>{" "}
            <span className="text-gray-400">
              {movie?.Type === "series" ? "TV Show" : "Movie"}
            </span>
          </p>

          {/* Release Date  */}
          <div className="mt-4">
            <div className="font-semibold text-gray-300">Release Date</div>{" "}
            <span className="text-gray-400">{movie?.Released}</span>
          </div>

          {/* Run Time  */}
          <div className="mt-2">
            <div className="font-semibold text-gray-300">Run Time</div>{" "}
            <span className="text-gray-400">{movie?.Runtime}</span>
          </div>

          {/* Genres  */}
          <div className="mt-2">
            <div className="font-semibold text-gray-300">Genres</div>{" "}
            {movie?.Genre.split(", ").map((genre, i) => (
              <span key={i} className="text-yellow-400">
                {genre}
                {i !== movie?.Genre.split(", ").length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
