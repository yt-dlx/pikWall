// src/app/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import Galaxy from "@/components/galaxy";
import "react-toastify/dist/ReactToastify.css";
import { FiInfo, FiBook } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import type { CardData } from "@/types/CardData";
import type { CardProps } from "@/types/CardProps";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EnvironmentEntry } from "@/types/EnvironmentEntry";
import { FaBookOpen, FaFeatherAlt, FaScroll, FaArrowDown, FaRegCompass, FaRegHeart } from "react-icons/fa";
// ====================================================================================================
// ====================================================================================================
const HeroSection: React.FC = () => {
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
// ====================================================================================================
// ====================================================================================================
const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => onSearch(searchQuery);
  return (
    <header className="fixed top-0 left-0 w-full  bg-[#0b0d0f]/60 backdrop-blur-md shadow-[#0b0d0f] shadow-2xl z-20">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-[#cdd6f4] flex items-center nordic-gradient-text">
            <FiBook className="inline-block mr-2" />
            picBook<span className="ml-2 text-xs">by Shovit</span>
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
// ====================================================================================================
// ====================================================================================================
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
// ====================================================================================================
// ====================================================================================================
const Card = memo(({ card, cardIdx, autoImageIndex, hoveredImage, handleMouseEnter, handleMouseLeave }: CardProps) => {
  Card.displayName = "Card";
  return (
    <AnimatePresence>
      <Link href={{ pathname: `/${encodeURIComponent(card.title)}`, query: { name: card.title } }}>
        <div className="bg-[#313244]/80 rounded-2xl overflow-hidden cursor-pointer relative group hover:shadow-xl flex flex-col w-full min-h-[280px] sm:min-h-[320px] transition-shadow duration-300 ease-in-out shadow-black shadow-lg">
          <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-[#3b4252]/80 text-[#cdd6f4] px-2 py-1 rounded-2xl shadow-md text-xs border">
            <FiInfo className="text-[#88c0d0] text-xs" />
            <span className="text-xs">Hover/Click To Download</span>
          </div>
          <div className="relative w-full h-60 overflow-hidden flex">
            {card.images.slice(0, 4).map((image, imgIdx) => {
              const isHovered = hoveredImage[cardIdx] === imgIdx;
              const isActive = !isHovered && autoImageIndex[cardIdx] === imgIdx;
              const gradientStyle = isHovered ? { background: `linear-gradient(135deg, ${image.primary}, ${image.secondary}, ${image.tertiary})`, borderRadius: "18px", padding: "2px" } : {};
              return (
                <motion.div
                  key={imgIdx}
                  animate={{
                    width: isHovered || isActive ? "70%" : "25%",
                    left: isHovered || isActive ? (imgIdx === card.images.slice(0, 4).length - 1 ? "30%" : imgIdx === 0 ? "0%" : `${imgIdx * 7.5}%`) : `${imgIdx * 25}%`
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  initial={{ width: "25%", left: `${imgIdx * 25}%` }}
                  onMouseLeave={() => handleMouseLeave(cardIdx)}
                  onMouseEnter={() => handleMouseEnter(cardIdx, imgIdx)}
                  style={{ ...gradientStyle, zIndex: 4 - imgIdx, willChange: "width, left" }}
                  className="absolute top-0 h-full rounded-2xl overflow-hidden transition-all"
                >
                  <div className={`w-full h-full bg-[#313244] rounded-2xl overflow-hidden ${isHovered || isActive ? "" : "filter saturate-[0.2]"}`}>
                    <motion.div initial={{ scale: 1 }} animate={{ scale: isHovered || isActive ? 1.2 : 1, transition: { duration: 0.2, ease: "easeInOut" } }} className="w-full h-full">
                      <Image src={image.previewLink} alt={`Preview ${imgIdx + 1}`} fill className="object-cover" unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="p-2 flex flex-grow">
            <div className="space-y-2 flex flex-col justify-between w-full">
              <div>
                <h4 className="text-xl font-semibold text-[#cdd6f4] flex items-center space-x-2">
                  <FaScroll className="text-sm sm:text-base" />
                  <span className="nordic-gradient-text capitalize truncate block w-full">{card.title}</span>
                </h4>
                <p className="text-[#a6adc8] flex items-center space-x-2 text-base sm:text-lg mt-1">
                  <FaFeatherAlt className="text-xs sm:text-base" />
                  <span className="text-xs truncate overflow-hidden whitespace-nowrap w-full capitalize">
                    <span className="nordic-gradient-text">Environment: </span>
                    {card.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </AnimatePresence>
  );
});
// ====================================================================================================
// ====================================================================================================
const ExploreSection: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);
  const [autoImageIndex, setAutoImageIndex] = useState<Record<number, number>>({});
  const [hoveredImage, setHoveredImage] = useState<Record<number, number | null>>({});
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, EnvironmentEntry> = await response.json();
        const transformedCards = Object.values(data).map((entry) => ({
          title: entry.environment_title,
          moral: entry.environment_moral,
          description: entry.environment_prompt,
          images: shuffleArray(entry.images.map((image) => ({ ...image, downloadLink: atob(image.downloadLink), previewLink: atob(image.previewLink) })))
        }));
        setCards(shuffleArray(transformedCards));
        setFilteredCards(transformedCards);
        setAutoImageIndex(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {}));
        setHoveredImage(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {}));
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoImageIndex((prevIndex) =>
        Object.keys(prevIndex).reduce((newIndex, cardIdx) => {
          const idx = parseInt(cardIdx);
          const card = cards[idx];
          const nextIndex = (prevIndex[idx] + 1) % (card?.images.length || 1);
          return { ...newIndex, [idx]: nextIndex };
        }, {})
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [cards]);
  const handleMouseEnter = (cardIdx: number, imgIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: imgIdx }));
  const handleMouseLeave = (cardIdx: number) => {
    setAutoImageIndex((prev) => {
      const lastHoveredImage = hoveredImage[cardIdx];
      if (lastHoveredImage !== null) return { ...prev, [cardIdx]: lastHoveredImage };
      return prev;
    });
    setHoveredImage((prev) => ({ ...prev, [cardIdx]: null }));
  };
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredCards(cards.filter((card) => card.title.toLowerCase().includes(lowercasedQuery) || card.description.toLowerCase().includes(lowercasedQuery)));
  }, [searchQuery, cards]);
  return (
    <React.Fragment>
      <ToastContainer />
      <h3 className="text-2xl sm:text-5xl font-semibold text-center text-[#cdd6f4] mb-6 sm:mb-8 flex items-center justify-center nordic-gradient-text">
        <FaBookOpen className="inline-block mr-2" />
        Explore Our Collection
      </h3>
      {loading && <p className="text-center text-[#a6adc8]">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 border-[#89b4fa]/20 border-double shadow-white border-2 p-2 rounded-2xl mx-auto">
          {filteredCards.map((card, cardIdx) => (
            <Card card={card} key={cardIdx} cardIdx={cardIdx} hoveredImage={hoveredImage} autoImageIndex={autoImageIndex} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
// ====================================================================================================
// ====================================================================================================
const PicBookPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <React.Fragment>
      <Header onSearch={setSearchQuery} />
      <Galaxy isModalOpen={false} />
      <main className="relative z-10 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <HeroSection />
        <ExploreSection searchQuery={searchQuery} />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default PicBookPage;
