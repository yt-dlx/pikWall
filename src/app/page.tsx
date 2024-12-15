// app/picbook/page.tsx
"use client";
import Image from "next/image";
import Galaxy from "@/components/galaxy";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiInfo, FiCamera, FiX, FiBookOpen, FiAlertCircle, FiMenu } from "react-icons/fi";
import { FaBookOpen, FaFeatherAlt, FaArrowDown, FaScroll, FaRegCompass, FaRegHeart } from "react-icons/fa";

// ====================================================================
type ImageMetadata = {
  original_file_name: string;
  format: string;
  mode: string;
  file_size_bytes: number;
  file_size_megabytes: number;
  width: number;
  height: number;
  primary: string;
  secondary: string;
  tertiary: string;
  [key: string]: string | number;
  downloadLink: string;
  previewLink: string;
};
type StoryEntry = {
  story_title: string;
  story_prompt: string;
  story_moral: string;
  images: ImageMetadata[];
};
type CardData = {
  title: string;
  description: string;
  story_moral: string;
  images: ImageMetadata[];
};
type CardProps = {
  card: CardData;
  cardIdx: number;
  autoImageIndex: Record<number, number>;
  hoveredImage: Record<number, number | null>;
  handleMouseEnter: (cardIdx: number, imgIdx: number) => void;
  handleMouseLeave: (cardIdx: number) => void;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
};
const shuffleArray = <T,>(arr: T[]): T[] => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
// ====================================================================
const Card = memo(({ card, cardIdx, autoImageIndex, hoveredImage, handleMouseEnter, handleMouseLeave, setSelectedCard }: CardProps) => {
  return (
    <div
      key={cardIdx}
      onClick={() => setSelectedCard(cardIdx)}
      className="bg-[#313244]/80 rounded-lg shadow-md overflow-hidden cursor-pointer relative group hover:shadow-xl flex flex-col w-full min-h-[280px] sm:min-h-[320px]"
    >
      <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-[#3b4252]/80 text-[#cdd6f4] px-2 py-1 rounded-lg shadow-md text-xs border">
        <FiInfo className="text-[#88c0d0] text-xs" />
        <span className="text-xs">Hover/Click Image</span>
      </div>
      <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden flex">
        {card.images.slice(0, 4).map((image, imgIdx) => {
          const isHovered = hoveredImage[cardIdx] === imgIdx;
          const isActive = !isHovered && autoImageIndex[cardIdx] === imgIdx;
          return (
            <motion.div
              key={imgIdx}
              className={`absolute top-0 h-full rounded-lg overflow-hidden transition-all duration-300 ${
                isHovered ? "border-[2px] sm:border-[4px] border-dotted border-transparent bg-gradient-to-br from-[#88c0d0] via-[#81a1c1] to-[#5e81ac]" : "border-transparent blur-[1px]"
              }`}
              style={{
                left: `${imgIdx * 25}%`,
                zIndex: 4 - imgIdx,
                willChange: "width, left"
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              animate={{
                width: isHovered || isActive ? "70%" : "25%",
                left: isHovered || isActive ? (imgIdx === card.images.slice(0, 4).length - 1 ? "30%" : imgIdx === 0 ? "0%" : `${imgIdx * 7.5}%`) : `${imgIdx * 25}%`
              }}
              onMouseLeave={() => handleMouseLeave(cardIdx)}
              onMouseEnter={() => handleMouseEnter(cardIdx, imgIdx)}
            >
              {image.previewLink ? (
                <div className="w-full h-full overflow-hidden rounded-lg transition-transform transform hover:scale-105 duration-300">
                  <Image src={image.previewLink} alt={`Preview ${imgIdx + 1}`} fill className="object-cover" unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-[#313244]">
                  <FiCamera className="text-[#7f849c] text-4xl" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="p-4 sm:p-6 flex flex-grow">
        <div className="space-y-2 flex flex-col justify-between w-full">
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#cdd6f4] flex items-center space-x-2">
              <FaScroll className="text-sm sm:text-base" />
              <span className="nordic-gradient-text capitalize truncate block w-full">{card.title}</span>
            </h4>
            <p className="text-[#a6adc8] flex items-center space-x-2 text-base sm:text-lg mt-1">
              <FaFeatherAlt className="text-xs sm:text-base" />
              <span className="truncate overflow-hidden whitespace-nowrap w-full capitalize">
                <span className="nordic-gradient-text">Story: </span>
                {card.description}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
Card.displayName = "Card";
// ====================================================================
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-[#1e1e2e]/40 backdrop-blur-md shadow-md z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#cdd6f4] flex items-center">
          <FiBook className="inline-block mr-2" />
          picBook
        </h1>
        <button className="md:hidden text-[#cdd6f4] text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FiMenu />
        </button>
        <nav className="hidden md:flex space-x-4">
          <a className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1" href="#explore">
            <FaRegCompass />
            <span>Explore</span>
          </a>
          <a href="#favorites" className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1">
            <FaRegHeart />
            <span>Favorites</span>
          </a>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#1e1e2e]/90 backdrop-blur-md">
            <nav className="flex flex-col items-center py-4 space-y-4">
              <a href="#explore" className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1" onClick={() => setIsMobileMenuOpen(false)}>
                <FaRegCompass />
                <span>Explore</span>
              </a>
              <a href="#favorites" className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1" onClick={() => setIsMobileMenuOpen(false)}>
                <FaRegHeart />
                <span>Favorites</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
// ====================================================================
const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#1e1e2e]/60 backdrop-blur-md shadow-md py-2 sm:py-4 z-20">
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
// ====================================================================
type ModalProps = {
  card: CardData;
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <motion.div
        className="bg-[#1e1e2e]/60 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black border-4 border-double border-[#89b4fa] p-4 sm:p-6 md:p-8 w-full max-h-[80vh] overflow-y-auto flex flex-col lg:flex-row relative"
        transition={{ duration: 0.3, ease: "easeOut" }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4 rounded-lg relative">
          {card.images.slice(0, 6).map((image, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg"
              transition={{ duration: 0.3, ease: "easeOut" }}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {image.previewLink ? (
                <Image fill unoptimized src={image.previewLink} alt={`Image ${idx + 1} - ${card.title}`} className="object-cover rounded transition-transform transform hover:scale-110 duration-300" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full bg-[#313244] text-[#7f849c] absolute inset-0">
                  <FiCamera className="text-3xl sm:text-5xl" />
                  <p className="text-sm sm:text-base mt-2">No Image</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-between p-4 sm:p-6">
          <div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4 nordic-gradient-text capitalize flex items-center gap-2">
              <FiBookOpen className="text-[#89b4fa] text-lg sm:text-xl" />
              {card.title}
            </h4>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 text-[#a6adc8] capitalize">{card.description}</p>
          </div>
          <div>
            <h5 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-[#89b4fa] flex items-center gap-2">
              <FiAlertCircle className="text-lg sm:text-xl" />
              Moral of the Story
            </h5>
            <p className="text-sm sm:text-base md:text-lg text-[#cdd6f4] capitalize">{card.story_moral}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-[#89b4fa] text-[#1e1e2e] w-full rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiX />
            Close Selected Story
          </button>
        </div>
      </motion.div>
    </div>
  );
};
// ====================================================================
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-[#cdd6f4] px-4 text-center overflow-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 flex flex-wrap items-center justify-center nordic-gradient-text text-center">
        <span>Stories Behind Pictures</span>
      </h1>
      <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-[#a6adc8] px-4">Dive into tales inspired by unique images and discover the art of visual storytelling.</p>
      <div className="w-full flex justify-center -mt-8 sm:-mt-16">
        <Image src="/logo.png" alt="Explore" width={300} height={300} className="cursor-pointer hover:scale-105 transition-transform duration-300 -hue-rotate-180 max-w-full" />
      </div>
      <a href="#explore" className="mt-4 sm:mt-6">
        <FaArrowDown className="text-[#89b4fa] text-2xl sm:text-4xl animate-bounce cursor-pointer hover:text-[#74c7ec]" aria-label="Scroll Down" />
      </a>
    </section>
  );
};
// ====================================================================
const ExploreSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [autoImageIndex, setAutoImageIndex] = useState<Record<number, number>>({});
  const [hoveredImage, setHoveredImage] = useState<Record<number, number | null>>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, StoryEntry> = await response.json();
        let transformedCards = Object.values(data).map((entry) => {
          const shuffledImages = shuffleArray(
            entry.images.map((image) => ({
              ...image,
              downloadLink: atob(image.downloadLink),
              previewLink: atob(image.previewLink)
            }))
          );
          return { title: entry.story_title, description: entry.story_prompt, story_moral: entry.story_moral, images: shuffledImages };
        });
        transformedCards = shuffleArray(transformedCards);
        setCards(transformedCards);
        setLoading(false);
        setAutoImageIndex(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {}));
        setHoveredImage(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {}));
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
          const card = cards[parseInt(cardIdx)];
          const nextIndex = (prevIndex[parseInt(cardIdx)] + 1) % (card?.images.length || 1);
          return { ...newIndex, [cardIdx]: nextIndex };
        }, {})
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [cards]);
  const handleMouseLeave = (cardIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: null }));
  const handleMouseEnter = (cardIdx: number, imgIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: imgIdx }));
  return (
    <>
      <ToastContainer />
      <h3 className="text-2xl sm:text-3xl font-semibold text-center text-[#cdd6f4] mb-6 sm:mb-8 flex items-center justify-center">
        <FaBookOpen className="inline-block mr-2" />
        Explore Our Collection
      </h3>
      {loading && <p className="text-center text-[#a6adc8]">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 border-white/20 shadow-white border-4 sm:border-8 border-double p-2 rounded-2xl mx-auto">
          {cards.map((card, cardIdx) => (
            <Card
              card={card}
              key={cardIdx}
              cardIdx={cardIdx}
              hoveredImage={hoveredImage}
              autoImageIndex={autoImageIndex}
              setSelectedCard={setSelectedCard}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      )}
      <AnimatePresence>{selectedCard !== null && <Modal card={cards[selectedCard]} onClose={() => setSelectedCard(null)} />}</AnimatePresence>
    </>
  );
};
// ====================================================================
const PicBookPage: React.FC = () => {
  const [selectedCard] = useState<null | number>(null);
  return (
    <>
      <Header />
      <Galaxy isModalOpen={selectedCard !== null} />
      <main className="relative z-10 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <HeroSection />
        <ExploreSection />
      </main>
      <Footer />
    </>
  );
};
export default PicBookPage;
