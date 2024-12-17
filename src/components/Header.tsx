import React, { useState } from "react";
import { FiBook } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";

const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => onSearch(searchQuery);
  return (
    <header className="fixed top-0 left-0 w-full  bg-[#0b0d0f]/60 backdrop-blur-md shadow-[#0b0d0f] shadow-2xl border-b-4 border-[#0b0d0f] z-20">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-[#cdd6f4] flex items-center nordic-gradient-text">
            <FiBook className="inline-block mr-2" />
            picBook<span className="ml-2 text-xs animate-bounce hidden sm:inline">by Shovit</span>
          </h1>
        </div>
        <div className="flex items-center bg-[#3b4252] text-[#cdd6f4] px-4 py-2 rounded-lg w-full md:w-auto max-w-lg">
          <input
            type="text"
            placeholder="Search Your Favourites..."
            className="bg-transparent outline-none text-sm md:text-base placeholder-[#a6adc8] flex-grow"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <button onClick={handleSearch} className="ml-4 text-[#cdd6f4] hover:text-[#89b4fa] text-lg" aria-label="Search">
            <FaRegCompass />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
