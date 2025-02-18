export default function Logo() {
    return (
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Left Triangle (cyan)  */}
        <div className="absolute w-6 h-8 bg-cyan-500 rounded-md clip-triangle-left"></div>
  
        {/* Right Triangle (indigo)  */}
        <div className="absolute w-6 h-8 bg-indigo-400 rounded-md clip-triangle-right"></div>
      </div>
    );
  }
  