"use client";

import React, { useState } from "react";
import Galaxy from "@/components/galaxy";
import { motion } from "framer-motion";

const PicBookPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<null | number>(null);

  const cards = [
    {
      title: "The Star and the Traveler",
      description: "In a vast galaxy, a lone traveler wandered, searching for meaning. One night, a bright star caught his eye..."
    },
    {
      title: "The Nebula's Embrace",
      description: "In the heart of a vibrant nebula, two gas clouds drifted, one bright and one dim. The bright cloud boasted of its brilliance..."
    },
    {
      title: "The Cosmic Orchestra",
      description: "In the depths of space, celestial bodies moved in a grand, silent dance. A young comet, dazzled by its own brilliance..."
    },
    {
      title: "The Star and the Traveler",
      description: "In a vast galaxy, a lone traveler wandered, searching for meaning. One night, a bright star caught his eye..."
    },
    {
      title: "The Nebula's Embrace",
      description: "In the heart of a vibrant nebula, two gas clouds drifted, one bright and one dim. The bright cloud boasted of its brilliance..."
    },
    {
      title: "The Cosmic Orchestra",
      description: "In the depths of space, celestial bodies moved in a grand, silent dance. A young comet, dazzled by its own brilliance..."
    },
    {
      title: "The Star and the Traveler",
      description: "In a vast galaxy, a lone traveler wandered, searching for meaning. One night, a bright star caught his eye..."
    },
    {
      title: "The Nebula's Embrace",
      description: "In the heart of a vibrant nebula, two gas clouds drifted, one bright and one dim. The bright cloud boasted of its brilliance..."
    }
  ];

  return (
    <>
      <Galaxy isModalOpen={selectedCard !== null} /> {/* Pass modal state */}
      <header className="fixed top-0 left-0 w-full bg-[#1e1e2e]/80 backdrop-blur-md shadow-md z-20">
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
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-bold mb-4">
            Welcome to picBook
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-lg max-w-2xl mx-auto mb-8">
            Discover a universe of stories and images that inspire and delight.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="px-6 py-3 text-lg bg-[#89b4fa] text-[#1e1e2e] font-semibold rounded-full shadow-lg hover:bg-[#74c7ec] transition"
          >
            🚀 Start Exploring
          </motion.button>
        </section>

        <section className="py-12 bg-[#1e1e2e]/60 backdrop-blur-md rounded-xl mx-4 md:mx-8 lg:mx-12 shadow-lg" id="explore">
          <h3 className="text-3xl font-semibold text-center text-[#cdd6f4] mb-8">🌌 Our Cosmic Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#313244]/80 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
                onClick={() => setSelectedCard(index)}
              >
                <div className="h-52 bg-[#45475a] flex items-center justify-center">
                  <span className="text-[#7f849c] text-6xl">📷</span>
                </div>
                <div className="p-4">
                  <h4 className="text-2xl font-semibold mb-2 text-[#cdd6f4]">{card.title}</h4>
                  <p className="text-[#a6adc8]">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50"
          >
            <div className="bg-[#1e1e2e] rounded-2xl shadow-xl p-6 md:p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto flex">
              <div className="w-1/2 flex items-center justify-center bg-[#45475a] rounded-lg">
                <span className="text-[#7f849c] text-9xl">📷</span>
              </div>
              <div className="w-1/2 pl-6 text-[#cdd6f4]">
                <h4 className="text-3xl font-semibold mb-4">{cards[selectedCard].title}</h4>
                <p className="text-lg">{cards[selectedCard].description}</p>
                <button onClick={() => setSelectedCard(null)} className="mt-6 px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-full shadow-md font-semibold hover:bg-[#74c7ec] transition">
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
