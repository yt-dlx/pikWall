// src/components/Hero.tsx
import React from "react";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
// ====================================================================================================
// ====================================================================================================
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-[#cdd6f4] px-4 text-center overflow-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 flex flex-wrap items-center justify-center nordic-gradient-text text-center">
        <span>Stories Behind Pictures</span>
      </h1>
      <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-[#a6adc8] px-4">Dive into tales inspired by unique images and discover the art of visual environmenttelling.</p>
      <div className="w-full flex justify-center -mt-8 sm:-mt-16">
        <Image src="/logo.png" alt="Explore" width={300} height={300} className="cursor-pointer hover:scale-105 transition-transform duration-300 -hue-rotate-180 max-w-full" />
      </div>
      <a href="#explore" className="mt-4 sm:mt-6">
        <FaArrowDown className="text-[#89b4fa] text-2xl sm:text-4xl animate-bounce cursor-pointer hover:text-[#74c7ec]" aria-label="Scroll Down" />
      </a>
    </section>
  );
};
export default Hero;
