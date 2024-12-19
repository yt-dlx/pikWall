// src/components/Header.tsx
import React from "react";
import { FiBook } from "react-icons/fi";
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0b0d0f]/60 backdrop-blur-md shadow-[#0b0d0f] shadow-2xl z-20">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-[#cdd6f4] flex items-center nordic-gradient-text">
            <FiBook className="inline-block mr-2" />
            picBook<span className="ml-2 text-xs">by Shovit</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
export default Header;
