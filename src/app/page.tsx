// app/picbook/page.tsx
"use client";
import Image from "next/image";
import Galaxy from "@/components/galaxy";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiInfo, FiCamera, FiX, FiBookOpen, FiDownload, FiClipboard } from "react-icons/fi";
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
type EnvironmentEntry = {
  environment_title: string;
  environment_prompt: string;
  images: ImageMetadata[];
};
type CardData = {
  title: string;
  description: string;
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
      className="bg-[#313244]/80 rounded-lg overflow-hidden cursor-pointer relative group hover:shadow-xl flex flex-col w-full min-h-[280px] sm:min-h-[320px] transition-shadow duration-300 ease-in-out shadow-black shadow  -lg"
    >
      <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-[#3b4252]/80 text-[#cdd6f4] px-2 py-1 rounded-lg shadow-md text-xs border">
        <FiInfo className="text-[#88c0d0] text-xs" />
        <span className="text-xs">Hover/Click To Download</span>
      </div>
      <div className="relative w-full h-60 overflow-hidden flex">
        {card.images.slice(0, 4).map((image, imgIdx) => {
          const isHovered = hoveredImage[cardIdx] === imgIdx;
          const isActive = !isHovered && autoImageIndex[cardIdx] === imgIdx;
          const gradientStyle = isHovered
            ? {
                background: `linear-gradient(135deg, ${image.primary}, ${image.secondary}, ${image.tertiary})`,
                borderRadius: "10px",
                padding: "2px"
              }
            : {};
          return (
            <motion.div
              key={imgIdx}
              animate={{
                width: isHovered || isActive ? "80%" : "25%",
                left: isHovered || isActive ? (imgIdx === card.images.slice(0, 4).length - 1 ? "30%" : imgIdx === 0 ? "0%" : `${imgIdx * 7.5}%`) : `${imgIdx * 25}%`
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              initial={{ width: "25%", left: `${imgIdx * 25}%` }}
              onMouseLeave={() => handleMouseLeave(cardIdx)}
              onMouseEnter={() => handleMouseEnter(cardIdx, imgIdx)}
              style={{ ...gradientStyle, zIndex: 4 - imgIdx, willChange: "width, left" }}
              className={`absolute top-0 h-full rounded-lg overflow-hidden transition-all ${isHovered ? "" : "sm:blur-[1px]"}`}
            >
              <div className={`w-full h-full bg-[#313244] rounded-lg overflow-hidden ${isHovered || isActive ? "" : "filter saturate-[0.2]"}`}>
                {image.previewLink ? (
                  <motion.div initial={{ scale: 1 }} animate={{ scale: isHovered || isActive ? 1.2 : 1, transition: { duration: 0.2, ease: "easeInOut" } }} className="w-full h-full">
                    <Image src={image.previewLink} alt={`Preview ${imgIdx + 1}`} fill className="object-cover" unoptimized sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-[#313244]">
                    <FiCamera className="text-[#7f849c] text-4xl" />
                  </div>
                )}
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
  );
});
Card.displayName = "Card";
// ====================================================================
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
// ====================================================================
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
// ====================================================================
type ModalProps = {
  card: CardData;
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const handleImageClick = (index: number) => setSelectedImage(index);
  const closeImageDetails = () => setSelectedImage(null);
  const handleCopyToClipboard = (color: string) => navigator.clipboard.writeText(color);
  if (selectedImage !== null) {
    return (
      <div className="fixed inset-0 bg-[#0b0d0f]/80 backdrop-blur-md flex justify-center items-center z-50">
        <div
          className="bg-gradient-to-b from-[color:var(--tw-gradient-from)] via-[color:var(--tw-gradient-via)] to-[color:var(--tw-gradient-to)] p-[4px] rounded-2xl w-full"
          style={
            {
              "--tw-gradient-from": card.images[selectedImage].primary,
              "--tw-gradient-via": card.images[selectedImage].secondary,
              "--tw-gradient-to": card.images[selectedImage].tertiary
            } as Record<string, string>
          }
        >
          <motion.div
            className="bg-[#1e1e2e] backdrop-blur-2xl rounded-2xl sm:p-4 md:p-6 w-full max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto flex flex-col lg:flex-row"
            transition={{ duration: 0.3, ease: "easeOut" }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="w-full lg:w-1/2 flex justify-center items-center sm:p-4 relative group">
              <div className="relative w-full h-auto max-h-[60vh] rounded-lg overflow-hidden shadow-lg group">
                {card.images[selectedImage].previewLink ? (
                  <>
                    <Image
                      src={card.images[selectedImage].previewLink}
                      alt={`Image ${selectedImage + 1} - ${card.title}`}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform transform duration-500 group-hover:scale-[1.5] group-hover:saturate-50 shadow-[#0b0d0f] shadow-xl border-2 border-[#0b0d0f] rounded-lg"
                    />
                    <a
                      download
                      title="Download Image"
                      aria-label="Download Image"
                      href={card.images[selectedImage].downloadLink}
                      className="absolute inset-0 flex justify-center items-center bg-[#0b0d0f]/60 text-[#cdd6f4] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <FiDownload className="text-8xl hover:text-[#89b4fa] transition-all" />
                    </a>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full bg-[#313244] text-[#7f849c]">
                    <FiBookOpen className="text-5xl" />
                    <p className="text-base mt-2">No Image</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-between p-4 sm:p-6">
              <div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4 nordic-gradient-text capitalize flex items-center gap-2">
                  <FiBookOpen className="text-[#89b4fa] text-lg sm:text-xl" />
                  {card.title}
                </h4>
                <ul className="text-[#a6adc8] text-xs sm:text-sm md:text-base list-disc list-inside">
                  <li>
                    <span className="font-medium nordic-gradient-text">Original Name:</span> {card.images[selectedImage].original_file_name}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Format:</span> {card.images[selectedImage].format}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Mode:</span> {card.images[selectedImage].mode}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Size:</span> {card.images[selectedImage].file_size_megabytes.toFixed(2)} MB ({card.images[selectedImage].file_size_bytes} bytes)
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Resolution:</span> {card.images[selectedImage].width} x {card.images[selectedImage].height}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Primary Color:</span> {card.images[selectedImage].primary}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Secondary Color:</span> {card.images[selectedImage].secondary}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text">Tertiary Color:</span> {card.images[selectedImage].tertiary}
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4 max-h-[120px] overflow-y-auto">
                {Object.keys(card.images[selectedImage])
                  .filter((key) => key.startsWith("more_"))
                  .map((colorKey) => (
                    <div
                      key={colorKey}
                      className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white cursor-pointer flex items-center justify-center"
                      style={{ backgroundColor: card.images[selectedImage][colorKey] as string }}
                      onMouseEnter={() => setHoveredColor(card.images[selectedImage][colorKey] as string)}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={() => handleCopyToClipboard(card.images[selectedImage][colorKey] as string)}
                    >
                      {hoveredColor === card.images[selectedImage][colorKey] && (
                        <div className="absolute top-full mt-1 px-2 py-1 bg-[#1e1e2e] text-white text-xs rounded shadow-md z-10">{card.images[selectedImage][colorKey]}</div>
                      )}
                      <FiClipboard className="text-white text-xs sm:text-sm" />
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={closeImageDetails}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#89b4fa] text-[#1e1e2e] rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <FiX />
                  Close Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-[#0b0d0f]/80 backdrop-blur-md flex justify-center items-center z-50">
      <motion.div
        className="bg-[#1e1e2e]/60 backdrop-blur-2xl rounded-2xl shadow-xl shadow-[#0b0d0f] border-2 border-[#89b4fa] p-4 sm:p-6 md:p-8 w-full max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto flex flex-col lg:flex-row relative"
        transition={{ duration: 0.3, ease: "easeOut" }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:gap-4 gap-2 p-2 sm:p-4 rounded-lg relative">
          {card.images.slice(0, 6).map((image, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-[#0b0d0f] shadow-2xl border-2 border-[#89b4fa]/20 hover:border-[#89b4fa] hover:border-dashed cursor-pointer"
              transition={{ duration: 0.3, ease: "easeOut" }}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => handleImageClick(idx)}
            >
              {image.previewLink ? (
                <Image
                  fill
                  unoptimized
                  src={image.previewLink}
                  alt={`Image ${idx + 1} - ${card.title}`}
                  className="object-cover rounded transition-transform transform hover:scale-125 duration-500 shadow-[#0b0d0f] shadow-xl animate-pulse"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full bg-[#313244] text-[#7f849c] absolute inset-0">
                  <FiBookOpen className="text-3xl sm:text-5xl" />
                  <p className="text-sm sm:text-base mt-2">No Image</p>
                </div>
              )}
              <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-[#3b4252]/80 text-[#cdd6f4] px-2 py-1 rounded-lg shadow-md text-xs border">
                <FiInfo className="text-[#88c0d0] text-xs" />
                <span className="text-xs">view</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-between p-4 sm:p-6">
          <div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4 nordic-gradient-text capitalize flex items-center gap-2">
              <FiBookOpen className="text-[#89b4fa] text-lg sm:text-xl" />
              {card.title}
            </h4>
            <p className="text-sm leading-relaxed mb-4 sm:mb-6 text-[#a6adc8] capitalize">{card.description}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-[#89b4fa] text-[#1e1e2e] w-full rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiX />
            Close Environment
          </button>
        </div>
      </motion.div>
    </div>
  );
};
// ====================================================================
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
// ====================================================================
const ExploreSection: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [pausedCards, setPausedCards] = useState<Record<number, boolean>>({});
  const [autoImageIndex, setAutoImageIndex] = useState<Record<number, number>>({});
  const [hoveredImage, setHoveredImage] = useState<Record<number, number | null>>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, EnvironmentEntry> = await response.json();
        const transformedCards = Object.values(data).map((entry) => ({
          title: entry.environment_title,
          description: entry.environment_prompt,
          images: shuffleArray(
            entry.images.map((image) => ({
              ...image,
              downloadLink: atob(image.downloadLink),
              previewLink: atob(image.previewLink)
            }))
          )
        }));
        setCards(shuffleArray(transformedCards));
        setFilteredCards(transformedCards);
        setAutoImageIndex(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {}));
        setHoveredImage(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: null }), {}));
        setPausedCards(transformedCards.reduce((acc, _, idx) => ({ ...acc, [idx]: false }), {}));
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
          if (pausedCards[idx]) return { ...newIndex, [idx]: prevIndex[idx] };
          const card = cards[idx];
          const nextIndex = (prevIndex[idx] + 1) % (card?.images.length || 1);
          return { ...newIndex, [idx]: nextIndex };
        }, {})
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [cards, pausedCards]);
  const handleMouseEnter = (cardIdx: number, imgIdx: number) => {
    setPausedCards((prev) => ({ ...prev, [cardIdx]: true }));
    setHoveredImage((prev) => ({ ...prev, [cardIdx]: imgIdx }));
  };
  const handleMouseLeave = (cardIdx: number) => {
    setPausedCards((prev) => ({ ...prev, [cardIdx]: false }));
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
    <>
      <ToastContainer />
      <h3 className="text-2xl sm:text-5xl font-semibold text-center text-[#cdd6f4] mb-6 sm:mb-8 flex items-center justify-center nordic-gradient-text">
        <FaBookOpen className="inline-block mr-2" />
        Explore Our Collection
      </h3>
      {loading && <p className="text-center text-[#a6adc8]">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 border-[#89b4fa]/20 border-double shadow-white border-2 sm:border-8 p-2 rounded-2xl mx-auto">
          {filteredCards.map((card, cardIdx) => (
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
      <AnimatePresence>{selectedCard !== null && <Modal card={filteredCards[selectedCard]} onClose={() => setSelectedCard(null)} />}</AnimatePresence>
    </>
  );
};
// ====================================================================
const PicBookPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Header onSearch={setSearchQuery} />
      <Galaxy isModalOpen={false} />
      <main className="relative z-10 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <HeroSection />
        <ExploreSection searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
};

export default PicBookPage;
