import Image from "next/image";
import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {images.map((image, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }} className="relative group">
          <Image src={image.src} alt={image.alt} width={300} height={300} className="rounded-lg shadow-lg" />
          <motion.a
            href={image.src}
            download={`galaxy-image-${index + 1}.jpg`}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white font-bold bg-purple-600 px-3 py-1 rounded">Download</span>
          </motion.a>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageGallery;
