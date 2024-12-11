import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Rocket, Star } from "lucide-react";

const Header = () => {
  return (
    <motion.header className="glass sticky top-0 z-50" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Book className="w-8 h-8 text-gruvbox-aqua" />
          <span className="text-2xl font-bold animated-gradient-text text-shadow-md">picBook</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gruvbox-fg1 hover:text-gruvbox-yellow transition-colors flex items-center text-shadow-sm">
                <Rocket className="w-4 h-4 mr-1" />
                Explore
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="text-gruvbox-fg1 hover:text-gruvbox-yellow transition-colors flex items-center text-shadow-sm">
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

export default Header;
