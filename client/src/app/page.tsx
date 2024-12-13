"use client";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo, useEffect } from "react";
import { BookIcon, Rocket, Star, Sparkles, BookOpen, X, Download, Github, Twitter, Instagram } from "lucide-react";

interface Story {
  id: number;
  title: string;
  content: string;
  moral: string;
  images: { src: string; alt: string }[];
}

function StarField({ speed = 0.5 }) {
  const ref = useRef<THREE.Points>(null);
  const starCount = 5000;
  const [positions] = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 0.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, [starCount]);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= (delta / 10) * speed;
      ref.current.rotation.y -= (delta / 15) * speed;
    }
  });
  return (
    <>
      {/* @ts-expect-error skip */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} />
        </Points>
        {/* @ts-expect-error skip */}
      </group>
    </>
  );
}

// Header component
const Header = () => {
  return (
    <motion.header className="glass sticky top-0 z-50 bg-nordic-bg1 bg-opacity-80" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BookIcon className="w-8 h-8 text-nordic-frost1" />
          <span className="text-2xl font-bold animated-gradient-text">picBook</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-nordic-fg1 hover:text-nordic-frost1 transition-colors flex items-center">
                <Rocket className="w-4 h-4 mr-1" />
                Explore
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="text-nordic-fg1 hover:text-nordic-frost1 transition-colors flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

// Footer component
const Footer = () => {
  return (
    <motion.footer
      className="bg-nordic-bg1 bg-opacity-80 backdrop-blur-md border-t border-nordic-frost2 border-opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-nordic-fg1 text-sm mb-4 md:mb-0">© 2023 picBook. All rights reserved. 🚀✨</p>
        <div className="flex space-x-4">
          <a href="#" className="text-nordic-fg1 hover:text-nordic-frost1 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-nordic-fg1 hover:text-nordic-frost1 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-nordic-fg1 hover:text-nordic-frost1 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

// BookShelf component
const BookShelf: React.FC<{ onSelectBook: (book: Story) => void; stories: Story[] }> = ({ onSelectBook, stories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stories.map((story, index) => (
        <motion.div key={story.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
          <motion.div
            className="book-card bg-nordic-bg2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectBook(story)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image src={story.images[0].src} alt={story.images[0].alt} layout="fill" objectFit="cover" className="transition-transform duration-300 transform hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-nordic-bg2 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl font-bold text-nordic-frost1 truncate">{story.title}</h2>
              </div>
            </div>
            <div className="p-4">
              <p className="text-nordic-fg1 text-sm line-clamp-3 mb-4">{story.content}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-nordic-aurora2 flex items-center">
                  <Star className="w-4 h-4 mr-1" fill="currentColor" />
                  <span className="mr-1">Moral Inside</span>
                </span>
                <span className="text-nordic-frost2 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{story.images.length} Images</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Book component
const Book: React.FC<{ story: Story; onClose: () => void }> = ({ story, onClose }) => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  if (!story) {
    return null;
  }

  return (
    <motion.div
      className="book-container max-w-6xl mx-auto bg-nordic-bg1 rounded-xl shadow-2xl overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="book relative flex">
        {/* Left page (Images) */}
        <div className="w-1/2 p-8 border-r border-nordic-fg0 border-opacity-20">
          <div className="grid grid-cols-2 gap-4">
            {story.images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover-lift"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" className="rounded-lg" />
                <AnimatePresence>
                  {hoveredImage === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-nordic-bg0 bg-opacity-80 flex items-center justify-center p-4"
                    >
                      <p className="text-nordic-fg0 text-center text-sm">{image.alt}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.a
                  href={image.src}
                  download={`picbook-image-${index + 1}.jpg`}
                  className="absolute bottom-2 right-2 bg-nordic-frost1 text-nordic-bg0 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right page (Story) */}
        <div className="w-1/2 p-8 relative">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center text-nordic-frost1 flex items-center justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <BookOpen className="w-8 h-8 mr-2 text-nordic-frost2" />
            {story.title}
          </motion.h2>
          <motion.div className="prose prose-invert max-w-none" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <p className="mb-6 text-justify leading-relaxed text-nordic-fg1">{story.content}</p>
            <div className="flex items-center justify-center text-nordic-aurora3 mb-4">
              <Star className="w-6 h-6 mr-2 text-nordic-aurora2" />
              <p className="font-bold">Moral of the Story</p>
              <Star className="w-6 h-6 ml-2 text-nordic-aurora2" />
            </div>
            <p className="text-center text-nordic-aurora3 italic">{story.moral}</p>
          </motion.div>
        </div>

        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 text-nordic-aurora0 hover:text-nordic-aurora1 transition-colors duration-300"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Decorative elements */}
        <Sparkles className="absolute top-4 left-4 w-6 h-6 text-nordic-aurora2 animate-pulse" />
        <Sparkles className="absolute bottom-4 right-4 w-6 h-6 text-nordic-aurora2 animate-pulse" />
      </div>
      <div className="absolute inset-0 pointer-events-none cloudy-shadow"></div>
    </motion.div>
  );
};

// Main component
export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    async function fetchStories() {
      const response = await fetch("/api/stories");
      const data = await response.json();
      setStories(data);
    }
    fetchStories();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-nordic-bg0">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField speed={selectedBook ? 2 : 0.5} />
        </Canvas>
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-cloudy-galaxy opacity-30"></div>
        </div>
      </div>
      <motion.div className="relative z-10 flex flex-col min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Header />
        <main className="flex-grow">
          <motion.section className="py-20 text-center" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="container mx-auto px-4">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 animated-gradient-text"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                Welcome to picBook 📚✨
              </motion.h1>
              <motion.p className="text-xl md:text-2xl text-nordic-fg1 mb-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
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
          </motion.section>

          <motion.section id="bookshelf" className="py-20" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
            <div className="container mx-auto px-4">
              <AnimatePresence mode="wait">
                {selectedBook ? (
                  <motion.div key="book" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <Book story={selectedBook} onClose={() => setSelectedBook(null)} />
                  </motion.div>
                ) : (
                  <motion.div key="bookshelf" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold mb-8 text-center text-nordic-frost1"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                      <Sparkles className="inline-block w-8 h-8 mr-2 text-nordic-aurora2 animate-pulse" />
                      Our Cosmic Collection
                    </motion.h2>
                    <BookShelf onSelectBook={setSelectedBook} stories={stories} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
