// app/picbook/page.tsx
"use client";
import Image from "next/image";
import Galaxy from "@/components/galaxy";
import "react-toastify/dist/ReactToastify.css";
import { FiBook, FiCamera } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
// ====================================================================
const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }
};
// ====================================================================
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
    <motion.div
      exit="exit"
      key={cardIdx}
      initial="hidden"
      whileInView="visible"
      variants={fadeVariants}
      viewport={{ once: false, amount: 0.2 }}
      onClick={() => setSelectedCard(cardIdx)}
      style={{ willChange: "transform, opacity" }}
      className="bg-[#313244]/80 rounded-lg shadow-md overflow-hidden cursor-pointer relative group hover:shadow-xl flex flex-col"
    >
      <div className="relative w-full h-60 overflow-hidden flex">
        {card.images.slice(0, 4).map((image, imgIdx) => {
          const isHovered = hoveredImage[cardIdx] === imgIdx;
          const isActive = !isHovered && autoImageIndex[cardIdx] === imgIdx;
          return (
            <motion.div
              key={imgIdx}
              className="absolute top-0 h-full shadow-black shadow-2xl rounded-lg border-dotted hover:border-2 hover:blur-none blur-[1px]"
              style={{ left: `${imgIdx * 25}%`, zIndex: 4 - imgIdx, willChange: "width, left" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              initial={{ width: "25%" }}
              animate={{
                width: isHovered || isActive ? "70%" : "25%",
                left: isHovered || isActive ? (imgIdx === card.images.slice(0, 4).length - 1 ? "30%" : imgIdx === 0 ? "0%" : `${imgIdx * 7.5}%`) : `${imgIdx * 25}%`
              }}
              onMouseLeave={() => handleMouseLeave(cardIdx)}
              onMouseEnter={() => handleMouseEnter(cardIdx, imgIdx)}
            >
              {image.previewLink ? (
                <Image src={image.previewLink} alt={`Preview ${imgIdx + 1}`} fill className="object-cover rounded-lg" unoptimized />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <FiCamera className="text-[#7f849c] text-6xl" />
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
            <span className="nordic-gradient-text">{card.title}</span>
          </h4>
          <p className="text-[#a6adc8] flex items-center space-x-2">
            <FaFeatherAlt />
            <span className="truncate overflow-hidden whitespace-nowrap w-72 text-xl">{card.description}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
});
Card.displayName = "Card";
// ====================================================================
const Header: React.FC = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-[#1e1e2e]/40 backdrop-blur-md shadow-md z-20"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeVariants}
      whileInView="visible"
      initial="hidden"
      exit="exit"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#cdd6f4] flex items-center">
          <FiBook className="inline-block mr-2" />
          picBook
        </h1>
        <nav className="flex space-x-4">
          <motion.a
            className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariants}
            whileInView="visible"
            initial="hidden"
            href="#explore"
            exit="exit"
          >
            <FaRegCompass />
            <span>Explore</span>
          </motion.a>
          <motion.a
            href="#favorites"
            className="text-[#cdd6f4] hover:text-[#89b4fa] flex items-center space-x-1"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeVariants}
            whileInView="visible"
            initial="hidden"
            exit="exit"
          >
            <FaRegHeart />
            <span>Favorites</span>
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
};
// ====================================================================
const Footer: React.FC = () => {
  return (
    <motion.footer
      className="fixed bottom-0 left-0 w-full bg-[#1e1e2e]/60 backdrop-blur-md shadow-md py-4 z-20"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeVariants}
      whileInView="visible"
      initial="hidden"
      exit="exit"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <motion.div
          className="text-[#cdd6f4] flex items-center space-x-2 font-semibold"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariants}
          whileInView="visible"
          initial="hidden"
          exit="exit"
        >
          <FaBookOpen />
          <span>picBook</span>
        </motion.div>
        <motion.p className="text-[#a6adc8] text-center" variants={fadeVariants} initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.2 }}>
          Crafted with imagination and stories. All rights reserved.
        </motion.p>
        <motion.div className="flex space-x-4 text-[#a6adc8]" variants={fadeVariants} initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.2 }}>
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaRegCompass />
          </a>
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaRegHeart />
          </a>
          <a href="#top" className="hover:text-[#89b4fa]">
            <FaBookOpen />
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};
// ====================================================================
type ModalProps = {
  card: CardData;
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
    >
      <motion.div
        className="bg-[#1e1e2e]/60 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black p-2 md:p-8 w-full sm:w-11/12 md:w-2/3 lg:w-3/4 max-h-[95vh] overflow-y-auto flex flex-col lg:flex-row relative"
        transition={{ duration: 0.6 }}
        variants={fadeVariants}
        animate="visible"
        initial="hidden"
        exit="exit"
      >
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 p-4 rounded-lg relative">
          {card.images.slice(0, 4).map((image, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeVariants}
              whileInView="visible"
              initial="hidden"
              exit="exit"
            >
              {image.previewLink ? (
                <Image
                  fill
                  unoptimized
                  src={image.previewLink}
                  alt={`Image ${idx + 1} - ${card.title}`}
                  className="object-cover rounded-lg transition-transform transform hover:scale-110 duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-[#313244] text-[#7f849c] absolute inset-0">
                  <FiCamera className="text-4xl" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-full lg:w-1/2 lg:pl-6 flex flex-col justify-between p-4 md:p-0"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariants}
          whileInView="visible"
          initial="hidden"
          exit="exit"
        >
          <div>
            <h4 className="text-3xl font-semibold mb-4 text-[#cdd6f4]">{card.title}</h4>
            <p className="text-lg leading-relaxed mb-6 text-[#a6adc8]">{card.description}</p>
          </div>
          <div>
            <h5 className="text-xl font-semibold mb-2 text-[#89b4fa]">Moral of the Story</h5>
            <p className="text-lg italic text-[#cdd6f4]">{card.story_moral}</p>
          </div>
          <button onClick={onClose} className="mt-6 px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition self-start">
            Close
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
// ====================================================================
const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-[#cdd6f4] px-4 text-center">
      <motion.h1
        className="text-6xl md:text-8xl font-bold leading-tight mb-4 flex flex-wrap items-center justify-center nordic-gradient-text"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
      >
        <span>Stories Behind Pictures</span>
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-[#a6adc8]"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 1 }}
        variants={fadeVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
      >
        Dive into tales inspired by unique images and discover the art of visual storytelling.
      </motion.p>
      <motion.a
        exit="exit"
        href="#explore"
        initial="hidden"
        whileInView="visible"
        variants={fadeVariants}
        className="inline-block"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <Image src="/logo.png" alt="Explore" width={400} height={400} className="cursor-pointer -mt-16 hover:scale-105 transition-transform duration-300 -hue-rotate-180" />
      </motion.a>
      <motion.a
        exit="exit"
        initial="hidden"
        href="#explore"
        className="mt-6"
        whileInView="visible"
        variants={fadeVariants}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <FaArrowDown className="text-[#89b4fa] text-4xl animate-bounce cursor-pointer hover:text-[#74c7ec]" aria-label="Scroll Down" />
      </motion.a>
    </section>
  );
};
// ====================================================================
const ExploreSection: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [autoImageIndex, setAutoImageIndex] = useState<Record<number, number>>({});
  const [hoveredImage, setHoveredImage] = useState<Record<number, number | null>>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, StoryEntry> = await response.json();
        let transformedCards = Object.values(data).map((entry) => {
          const shuffledImages = shuffleArray(entry.images.map((image) => ({ ...image, downloadLink: atob(image.downloadLink), previewLink: atob(image.previewLink) })));
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
    const checkScreenSize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsDesktopView(isDesktop);
      if (!isDesktop) {
        toast.info("PicBook is best experienced on desktop. Please use a larger screen.", {
          hideProgressBar: false,
          position: "top-center",
          pauseOnHover: true,
          progress: undefined,
          closeOnClick: true,
          autoClose: 5000,
          draggable: true,
          theme: "dark"
        });
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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
  const handleMouseLeave = (cardIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: null }));
  const handleMouseEnter = (cardIdx: number, imgIdx: number) => setHoveredImage((prev) => ({ ...prev, [cardIdx]: imgIdx }));
  if (!isDesktopView) {
    return (
      <motion.div
        className="min-h-screen absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-50"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
      >
        <FaBookOpen className="text-6xl text-[#89b4fa] mb-4 animate-pulse" />
        <motion.h1 className="text-3xl font-bold text-[#cdd6f4] mb-4 nordic-gradient-text" variants={fadeVariants}>
          PicBook Requires Desktop View
        </motion.h1>
        <motion.ul className="text-[#a6adc8] mb-6 max-w-md list-disc list-inside text-left space-y-2" variants={fadeVariants}>
          <li>This application is optimized for desktop viewing and requires a larger screen.</li>
          <li>Please switch to a desktop or laptop computer to fully explore our stories and images.</li>
          <li>
            If you are on a mobile device, you can enable <span className="font-bold underline">&quot;Desktop View&quot;</span> in your browser settings.
          </li>
        </motion.ul>
        <ToastContainer />
      </motion.div>
    );
  }
  return (
    <>
      <ToastContainer />
      <motion.h3
        className="text-3xl font-semibold text-center text-[#cdd6f4] mb-8 flex items-center justify-center"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
      >
        <FaBookOpen className="inline-block mr-2" />
        Explore Our Collection
      </motion.h3>
      {loading && (
        <motion.p className="text-center text-[#a6adc8]" variants={fadeVariants} initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.2 }}>
          Loading...
        </motion.p>
      )}
      {error && (
        <motion.p className="text-center text-red-500" variants={fadeVariants} initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.2 }}>
          {error}
        </motion.p>
      )}
      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-white/20 shadow-white border-8 border-double p-2 rounded-2xl"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeVariants}
          whileInView="visible"
          initial="hidden"
          exit="exit"
        >
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
        </motion.div>
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
      <motion.main className="relative z-10 pt-20 pb-24" variants={fadeVariants} initial="hidden" whileInView="visible" exit="exit" viewport={{ once: false, amount: 0.2 }}>
        <HeroSection />
        <ExploreSection />
      </motion.main>
      <Footer />
    </>
  );
};

export default PicBookPage;
