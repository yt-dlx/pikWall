import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer className="bg-black bg-opacity-50 backdrop-blur-md border-t border-purple-500 border-opacity-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 picBook. All rights reserved. 🚀✨</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
