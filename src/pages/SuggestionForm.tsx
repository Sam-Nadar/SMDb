import { useState } from "react";
import Navbar from "../components/Navbar";

export default function MovieForm() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("Movie"); // Default selection is Movie

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { name, genre, type });

    // Reset form fields
    setName("");
    setGenre("");
    setType("Movie"); // Reset to default option
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e1327] text-white">
     
      <Navbar />


      <div className="flex flex-1 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-lg w-80"
        >
          <h2 className="text-white text-center text-xl font-semibold mb-4">
            Add Movie/TV Show
          </h2>

          
          <label className="block text-gray-300 text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter movie/TV show name"
            className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          
          <label className="block text-gray-300 text-sm mb-1">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
            className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          
          <label className="block text-gray-300 text-sm mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
            <option value="Series">Series</option>
          </select>

          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
