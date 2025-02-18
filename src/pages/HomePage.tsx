import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMoviesAndShows } from "../api";
import axios from "axios"; // Import Axios for API request
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { MovieDetails } from "../types";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";

const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = "https://www.omdbapi.com/";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "all"; // Read tab from URL, default to 'all'

  const [allItems, setAllItems] = useState<MovieDetails[]>([]);
  const [filteredItems, setFilteredItems] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadMoviesAndShows = async () => {
      const data = await fetchMoviesAndShows();
      if (data.length > 0) {
        setAllItems(data);
        setFilteredItems(data);
      } else {
        setError("No movies or TV shows found.");
      }
      setLoading(false);
    };
    loadMoviesAndShows();
  }, []);

  useEffect(() => {
    if (activeTab === "movies") {
      setFilteredItems(allItems.filter((item) => item.Type === "movie"));
    } else if (activeTab === "tv shows") {
      setFilteredItems(allItems.filter((item) => item.Type === "series"));
    } else {
      setFilteredItems(allItems);
    }
  }, [activeTab, allItems]);

  // Sync activeTab when URL changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [location.search]);

  // Function to update active tab & URL when clicking a filter
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/?tab=${tab}`); // Update URL with new tab
  };

  // Function to handle search and get the movie ID
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${searchQuery.trim()}`);
        if (response.data && response.data.imdbID) {
          navigate(`/movie/${response.data.imdbID}`); // ✅ Navigate using the ID
        } else {
          alert("Movie not found! Please try another name.");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        alert("Something went wrong! Please try again.");
      }
    }
  };

  // Handle Enter Key Press in Search Input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="relative w-full min-h-screen bg-[#0e1327] text-white">
      <Navbar />

      {/* Search Section */}
      <div className="pt-24 container mx-auto flex flex-col md:items-start items-center md:text-left text-center px-5">
        <h1 className="text-4xl font-bold">SMDb</h1>
        <p className="text-gray-400 mt-2">List of movies & TV shows I have watched till date.</p>
        <p className="text-gray-400 mt-2">Feel free to make a suggestion.</p>

        {/* Search Bar with Button */}
        <div className="relative w-full max-w-md md:max-w-sm mt-6 flex">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Movies or TV Shows"
            className="w-full pl-10 pr-4 py-2 rounded-l-full bg-gray-900 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Allow search on Enter key press
          />
          <button
            className="bg-indigo-500 text-black px-4 rounded-r-full hover:bg-indigo-600 transition text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Soft Radial Glow Effect - Positioned at the Right */}
      <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,#00ffff,#00e6e6,#00cccc,#00b3b3,#009999)] opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-60 left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,#00ff00,#00e600,#00cc00,#00b300,#009900)] opacity-20 blur-3xl pointer-events-none"></div>

      {/* Filter Tabs */}
      <div className="container mx-auto flex flex-col md:items-start items-center md:text-left text-center px-5 mt-8">
        <div className="flex gap-4">
          {["all", "movies", "tv shows"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full ${
                activeTab === tab ? "bg-indigo-400 text-black" : "bg-gray-800 text-white"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Label (All(12), Movies(6), TV Shows(6)) */}
      <div className="container mx-auto px-5 mt-4 md:text-left text-center text-gray-400 text-lg font-medium">
        {activeTab === "all" && `All (${filteredItems.length})`}
        {activeTab === "movies" && `Movies (${filteredItems.length})`}
        {activeTab === "tv shows" && `TV Shows (${filteredItems.length})`}
      </div>

      {/* Movie List */}
      <div className="container mx-auto p-5 mt-6">
        <MovieList movies={filteredItems} />
      </div>
    </div>
  );
}
