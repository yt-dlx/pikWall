"use client";
import Image from "next/image";
import Galaxy from "@/components/galaxy";
import { FiBook, FiCamera } from "react-icons/fi";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaImages, FaBookOpen, FaArrowRight, FaFeatherAlt, FaScroll, FaRegCompass, FaRegHeart } from "react-icons/fa";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

function shuffleArray<T>(arr: T[]): T[] {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Card = memo(({ card, cardIdx, autoImageIndex, hoveredImage, handleMouseEnter, handleMouseLeave, setSelectedCard }: CardProps) => {
  return (
    <motion.div
      key={cardIdx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#313244]/80 rounded-lg shadow-md overflow-hidden cursor-pointer relative group hover:shadow-xl flex flex-col"
      style={{ willChange: "transform, opacity" }}
      onClick={() => setSelectedCard(cardIdx)}
    >
      <div className="relative w-full h-80 overflow-hidden flex">
        {card.images.slice(0, 4).map((image, imgIdx) => {
          const isHovered = hoveredImage[cardIdx] === imgIdx;
          const isActive = !isHovered && autoImageIndex[cardIdx] === imgIdx;
          return (
            <motion.div
              key={imgIdx}
              className="absolute top-0 h-full shadow-black shadow-xl rounded-lg border-dashed hover:border hover:blur-none blur-[1px]"
              initial={{ width: "25%" }}
              style={{
                left: `${imgIdx * 25}%`,
                zIndex: 4 - imgIdx,
                willChange: "width, left"
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              animate={{
                width: isHovered || isActive ? "70%" : "25%",
                left: isHovered || isActive ? (imgIdx === card.images.slice(0, 4).length - 1 ? "30%" : `${imgIdx === 0 ? 0 : imgIdx * 7.5}%`) : `${imgIdx * 25}%`
              }}
              onMouseEnter={() => handleMouseEnter(cardIdx, imgIdx)}
              onMouseLeave={() => handleMouseLeave(cardIdx)}
            >
              {image.previewLink ? (
                <Image src={image.previewLink} alt={`Preview ${imgIdx + 1}`} fill className="object-cover rounded-lg" unoptimized />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <FiCamera className="text-[#7f849c] text-6xl" />{" "}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="p-4 flex">
        <div className="space-y-2 flex-grow">
          <h4 className="text-2xl font-semibold text-[#cdd6f4] flex items-center space-x-2">
            <FaScroll />
            <span>{card.title}</span>
          </h4>
          <p className="text-[#a6adc8] flex items-center space-x-2">
            <FaFeatherAlt />
            <span className="truncate">{card.description}</span>
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCard(cardIdx);
          }}
          className="px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-lg shadow-md font-semibold hover:bg-[#74c7ec] flex items-center space-x-2 self-center"
        >
          <span>Explore Story</span>
          <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
});

Card.displayName = "Card";

const PicBookPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoImageIndex, setAutoImageIndex] = useState<Record<number, number>>({});
  const [hoveredImage, setHoveredImage] = useState<Record<number, number | null>>({});

  const decodeBase64 = (str: string) => {
    try {
      return atob(str);
    } catch {
      return str;
    }
  };

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
              downloadLink: decodeBase64(image.downloadLink),
              previewLink: decodeBase64(image.previewLink)
            }))
          );
          return {
            title: entry.story_title,
            description: entry.story_prompt,
            story_moral: entry.story_moral,
            images: shuffledImages
          };
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
    }, 3000);
    return () => clearInterval(interval);
  }, [cards]);

  const handleMouseEnter = (cardIdx: number, imgIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: imgIdx }));
  const handleMouseLeave = (cardIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: null }));

  return (
    <>
      <Galaxy isModalOpen={selectedCard !== null} />
      <header className="fixed top-0 left-0 w-full bg-[#1e1e2e]/40 backdrop-blur-md shadow-md z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#cdd6f4] flex items-center">
            <FiBook className="inline-block mr-2" />
            picBook
          </h1>
          <nav className="flex space-x-4">
            <a href="#explore" className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1">
              <FaRegCompass />
              <span>Explore</span>
            </a>
            <a href="#favorites" className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1">
              <FaRegHeart />
              <span>Favorites</span>
            </a>
          </nav>
        </div>
      </header>
      <main className="relative z-10 pt-20 pb-24">
        <section className="relative h-[80vh] flex flex-col items-center justify-center text-[#cdd6f4] px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold leading-tight mb-4 flex flex-wrap items-center justify-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <FaBookOpen className="inline-block mr-2" />
            <FaImages className="inline-block mr-2" />
            Stories Behind Pictures
          </motion.h1>
          <motion.p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-[#a6adc8]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            Dive into tales inspired by unique images and discover the art of visual storytelling.
          </motion.p>
          <motion.a
            href="#explore"
            className="px-6 py-3 bg-[#89b4fa] text-[#1e1e2e] rounded-full shadow-md font-semibold hover:bg-[#74c7ec] flex items-center space-x-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <span>Start Exploring</span>
            <FaArrowRight />
          </motion.a>
        </section>
        <section className="py-12 rounded-xl mx-4 md:mx-8 lg:mx-12 shadow-lg" id="explore">
          <motion.h3
            className="text-3xl font-semibold text-center text-[#cdd6f4] mb-8 flex items-center justify-center"
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FaBookOpen className="inline-block mr-2" />
            Explore Our Collection
          </motion.h3>
          {loading && <p className="text-center text-[#a6adc8]">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
              {cards.map((card, cardIdx) => (
                <Card
                  key={cardIdx}
                  card={card}
                  cardIdx={cardIdx}
                  autoImageIndex={autoImageIndex}
                  hoveredImage={hoveredImage}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  setSelectedCard={setSelectedCard}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <motion.footer
        className="fixed bottom-0 left-0 w-full bg-[#1e1e2e]/60 backdrop-blur-md shadow-md py-4 z-20"
        variants={sectionHeadingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-[#cdd6f4] flex items-center space-x-2 font-semibold">
            <FaBookOpen />
            <span>picBook</span>
          </div>
          <p className="text-[#a6adc8] text-center">Crafted with imagination and stories. All rights reserved.</p>
          <div className="flex space-x-4 text-[#a6adc8]">
            <a href="#top" className="hover:text-[#89b4fa]">
              <FaRegCompass />
            </a>
            <a href="#top" className="hover:text-[#89b4fa]">
              <FaRegHeart />
            </a>
            <a href="#top" className="hover:text-[#89b4fa]">
              <FiBook />
            </a>
          </div>
        </div>
      </motion.footer>
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
          >
            <div className="bg-[#1e1e2e]/60 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black p-2 md:p-8 w-full sm:w-11/12 md:w-2/3 lg:w-3/4 max-h-[95vh] overflow-y-auto flex flex-col lg:flex-row relative">
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 p-4 rounded-lg relative">
                {cards[selectedCard]?.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg">
                    {image.previewLink ? (
                      <Image
                        fill
                        src={image.previewLink}
                        alt={`Image ${idx + 1} - ${cards[selectedCard].title}`}
                        className="object-cover rounded-lg transition-transform transform hover:scale-110 duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-[#313244] text-[#7f849c] absolute inset-0">
                        <FiCamera className="text-4xl" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-between p-4 md:p-0">
                <div>
                  <h4 className="text-3xl font-semibold mb-4 text-[#cdd6f4]">{cards[selectedCard].title}</h4>
                  <p className="text-lg leading-relaxed mb-6 text-[#a6adc8]">{cards[selectedCard].description}</p>
                </div>
                <div>
                  <h5 className="text-xl font-semibold mb-2 text-[#89b4fa]">Moral of the Story</h5>
                  <p className="text-lg italic text-[#cdd6f4]">{cards[selectedCard].story_moral}</p>
                </div>
                <button onClick={() => setSelectedCard(null)} className="mt-6 px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition self-start">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PicBookPage;
