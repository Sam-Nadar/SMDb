import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

interface NavbarProps {
  setActiveTab?: (tab: string) => void;
}

export default function Navbar({ setActiveTab }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab") || "all"; // Get the active tab from URL

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab?.(tab);
    navigate(`/?tab=${tab}`); // Update URL
  };

  return (
    <nav className="flex justify-between items-center px-5 py-4 bg-[##0d111c]/50 backdrop-blur-lg w-full z-50">
       {/* Left - Logo  */}
      <Logo/>
      {/* sm:gap-6 */}
      {/* sm:mr-10 md:mr-15 lg:mr-20 */}
      {/* Right - Nav Links  */}
      <div className="flex gap-6 md:gap-12 md:mr-15 lg:mr-20">
        <button 
          className={`${activeTab === "movies" ? "text-indigo-400" : ""} hover:text-gray-400 transition`} 
          onClick={() => handleTabClick("movies")}
        >
          Movies
        </button>
        <button 
          className={`${activeTab === "tv shows" ? "text-indigo-400" : ""} hover:text-gray-400 transition`} 
          onClick={() => handleTabClick("tv shows")}
        >
          TV Shows
        </button>
        <Link to="/suggest-me" className="hover:text-gray-400 transition">Suggest me →</Link>
      </div>
    </nav>
  );
}
