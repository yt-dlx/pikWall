import React from "react";
import { FaBookOpen, FaRegCompass, FaRegHeart } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#0b0d0f]/60 backdrop-blur-md shadow-md py-2 sm:py-4 z-20">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <div className="text-[#cdd6f4] flex items-center space-x-2 font-semibold text-sm sm:text-base">
          <FaBookOpen />
          <span>picBook</span>
        </div>
        <p className="text-[#a6adc8] text-center text-xs sm:text-sm">Crafted with imagination and stories. All rights reserved.</p>
        <div className="flex space-x-4 text-[#a6adc8] text-sm sm:text-base">
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaRegCompass />
          </a>
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaRegHeart />
          </a>
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaBookOpen />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
