import { X, Download, BookOpen, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface BookProps {
  story: {
    title: string;
    content: string;
    moral: string;
    images: { src: string; alt: string }[];
  };
  onClose: () => void;
}

const Book: React.FC<BookProps> = ({ story, onClose }) => {
  const [hoveredImage] = useState<number | null>(null);

  return (
    <motion.div
      className="book-container max-w-6xl mx-auto bg-gruvbox-bg0 rounded-xl shadow-2xl overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="book relative flex">
        {/* Left page (Images) */}
        <div className="w-1/2 p-8 border-r border-gruvbox-fg0 border-opacity-20">
          <div className="grid grid-cols-2 gap-4">
            {story.images.map((image, index) => (
              <motion.div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover-lift" whileHover={{ scale: 1.05 }}>
                <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" className="rounded-lg" />
                <AnimatePresence>
                  {hoveredImage === index && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-gruvbox-bg0 bg-opacity-80 flex items-center justify-center p-4">
                      <p className="text-gruvbox-fg0 text-center text-sm">{image.alt}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.a href={image.src} download={`picbook-image-${index + 1}.jpg`} className="absolute bottom-2 right-2 bg-gruvbox-orange text-gruvbox-bg0 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Download className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right page (Story) */}
        <div className="w-1/2 p-8 relative">
          <motion.h2 className="text-3xl font-bold mb-4 text-center text-gruvbox-yellow flex items-center justify-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <BookOpen className="w-8 h-8 mr-2 text-gruvbox-aqua" />
            {story.title}
          </motion.h2>
          <motion.div className="prose prose-invert max-w-none" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <p className="mb-6 text-justify leading-relaxed text-gruvbox-fg1">{story.content}</p>
            <div className="flex items-center justify-center text-gruvbox-green mb-4">
              <Star className="w-6 h-6 mr-2 text-gruvbox-yellow" />
              <p className="font-bold">Moral of the Story</p>
              <Star className="w-6 h-6 ml-2 text-gruvbox-yellow" />
            </div>
            <p className="text-center text-gruvbox-green italic">{story.moral}</p>
          </motion.div>
        </div>

        {/* Close button */}
        <motion.button className="absolute top-4 right-4 text-gruvbox-red hover:text-gruvbox-orange transition-colors duration-300" onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
          <X className="w-6 h-6" />
        </motion.button>

        {/* Decorative elements */}
        <Sparkles className="absolute top-4 left-4 w-6 h-6 text-gruvbox-yellow animate-pulse" />
        <Sparkles className="absolute bottom-4 right-4 w-6 h-6 text-gruvbox-yellow animate-pulse" />
      </div>
      <div className="absolute inset-0 pointer-events-none cloudy-shadow"></div>
    </motion.div>
  );
};

export default Book;
