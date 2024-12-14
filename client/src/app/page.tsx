"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Galaxy from "@/components/galaxy";
import React, { useState, useEffect } from "react";

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

const PicBookPage: React.FC = () => {
  const [cards, setCards] = useState<
    {
      title: string;
      description: string;
      story_moral: string;
      images: ImageMetadata[];
    }[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const decodeBase64 = (str: string) => {
    try {
      return atob(str);
    } catch {
      console.error("Invalid Base64 string:", str);
      return str;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, StoryEntry> = await response.json();
        const transformedCards = Object.values(data).map((entry) => ({
          title: entry.story_title,
          description: entry.story_prompt,
          story_moral: entry.story_moral,
          images: entry.images.map((image) => ({
            ...image,
            downloadLink: decodeBase64(image.downloadLink),
            previewLink: decodeBase64(image.previewLink)
          }))
        }));
        setCards(transformedCards);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Galaxy isModalOpen={selectedCard !== null} />
      <header className="fixed top-0 left-0 w-full bg-[#1e1e2e]/40 backdrop-blur-md shadow-md z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#cdd6f4] flex items-center">✨ picBook</h1>
          <nav className="flex space-x-4">
            <a href="#explore" className="text-[#cdd6f4] hover:text-[#89b4fa] transition">
              Explore
            </a>
            <a href="#favorites" className="text-[#cdd6f4] hover:text-[#89b4fa] transition">
              Favorites
            </a>
          </nav>
        </div>
      </header>
      <main className="relative z-10 pt-20">
        <section className="text-center py-16 px-6 text-[#cdd6f4]">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-8xl font-bold mb-4">
            Welcome to picBook
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-lg max-w-2xl mx-auto mb-8">
            Discover a universe of stories and images that inspire and delight.
          </motion.p>
        </section>
        <section className="py-12 rounded-xl mx-4 md:mx-8 lg:mx-12 shadow-lg" id="explore">
          <h3 className="text-3xl font-semibold text-center text-[#cdd6f4] mb-8">🌌 Our Cosmic Collection</h3>
          {loading && <p className="text-center text-[#a6adc8]">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#313244]/80 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition relative group"
                  onClick={() => setSelectedCard(index)}
                >
                  {/* Stacked Images with Hover Effect */}
                  <div className="relative w-full h-52 overflow-hidden flex">
                    {card.images.slice(0, 4).map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute top-0 h-full"
                        style={{
                          left: `${idx * 25}%`,
                          zIndex: 4 - idx
                        }}
                        initial={{
                          width: "25%"
                        }}
                        whileHover={{
                          width: "70%",
                          left: idx === card.images.slice(0, 4).length - 1 ? "30%" : `${idx === 0 ? 0 : idx * 7.5}%`
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                      >
                        {image.previewLink ? (
                          <Image src={image.previewLink} alt={`Preview ${idx + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                        ) : (
                          <span className="text-[#7f849c] text-6xl">📷</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4">
                    <h4 className="text-2xl font-semibold mb-2 text-[#cdd6f4]">{card.title}</h4>
                    <p className="text-[#a6adc8] truncate">{card.description}</p>
                    <button onClick={() => setSelectedCard(index)} className="mt-4 px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-lg shadow-md font-semibold hover:bg-[#74c7ec] transition">
                      Open Book
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <div className="bg-[#1e1e2e]/60 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black p-2 md:p-8 w-11/12 md:w-2/3 lg:w-3/4 max-h-[100vh] overflow-y-auto flex flex-col lg:flex-row">
              <div className="lg:w-1/2 flex flex-wrap gap-4 p-4 rounded-lg">
                {cards[selectedCard]?.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="w-[45%] aspect-square rounded-lg relative overflow-hidden flex items-center justify-center">
                    {image.previewLink ? (
                      <Image
                        unoptimized
                        layout="fill"
                        objectFit="cover"
                        src={image.previewLink}
                        alt={`Image ${idx + 1} - ${cards[selectedCard].title}`}
                        className="rounded-lg transition-transform transform hover:scale-125 duration-300"
                      />
                    ) : (
                      <span className="text-[#7f849c] text-6xl flex items-center justify-center h-full">📷</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="lg:w-1/2 pl-6 flex flex-col justify-between">
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
      </main>
    </>
  );
};

export default PicBookPage;
