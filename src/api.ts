import axios from "axios";
import { MovieDetails } from "./types";

const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = "https://www.omdbapi.com/";

const MOVIE_TITLES = [
  "Avengers Infinity War", "Oblivion", "Mission Impossible", 
  "The Conjuring", "Salaar", "The Social Network"
];

const TV_SHOW_TITLES = [
  "Farzi", "Loki", "Breaking Bad", "Young Sheldon", "Mr. Robot", "Better Call Saul"
];


 // Fetches a list of movies & TV shows
 
export const fetchMoviesAndShows = async (): Promise<MovieDetails[]> => {
  try {
    // Fetch movies
    const movieRequests = MOVIE_TITLES.map((title) =>
      axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${title}`)
    );

    // Fetch TV shows
    const tvShowRequests = TV_SHOW_TITLES.map((title) =>
      axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${title}`)
    );

    // Await both movie & TV show responses
    const movieResponses = await Promise.all(movieRequests);
    const tvShowResponses = await Promise.all(tvShowRequests);

    // Extract valid data
    const movies = movieResponses.map((res) => ({
      ...res.data,
      imdbRating: res.data.imdbRating || "N/A",
    }));

    const tvShows = tvShowResponses.map((res) => ({
      ...res.data,
      imdbRating: res.data.imdbRating || "N/A",
    }));

    return [...movies, ...tvShows];
  } catch (error) {
    console.error("Error fetching movies and TV shows:", error);
    return [];
  }
};


export const fetchMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return {
      ...response.data,
      imdbRating: response.data.imdbRating || "N/A",
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
