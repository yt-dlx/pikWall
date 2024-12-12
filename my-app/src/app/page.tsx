"use client";
import Book from "@/components/Book";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "@/components/StarField";
import { Sparkles, BookOpen } from "lucide-react";
import BookShelf from "@/components/BookShelf";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField speed={selectedBook ? 2 : 0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10">
        <section className="py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 animated-gradient-text"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              Welcome to picBook 📚✨
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gruvbox-fg1 mb-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Explore a galaxy of stories and images that will inspire and delight you.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              className="bg-nordic-frost1 hover:bg-nordic-frost2 text-nordic-bg0 font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300 transform perspective-1000 hover-lift"
              onClick={() => document.getElementById("bookshelf")?.scrollIntoView({ behavior: "smooth" })}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Reading
            </motion.button>
          </motion.div>
        </section>

        <section id="bookshelf" className="py-20">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {selectedBook ? (
                <motion.div key="book" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
                  <Book story={selectedBook} onClose={() => setSelectedBook(null)} />
                </motion.div>
              ) : (
                <motion.div key="bookshelf" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-8 text-center text-3d text-gruvbox-yellow"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  >
                    <Sparkles className="inline-block w-8 h-8 mr-2 text-gruvbox-aqua animate-pulse" />
                    Our Cosmic Collection
                  </motion.h2>
                  <BookShelf onSelectBook={setSelectedBook} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <div className="asteroid"></div>
      <div className="asteroid"></div>
      <div className="asteroid"></div>
    </div>
  );
}
