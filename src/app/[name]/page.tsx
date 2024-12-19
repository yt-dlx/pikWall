"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Galaxy from "@/components/galaxy";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CardData } from "@/types/CardProps";
import { FiBook, FiDownload, FiClipboard } from "react-icons/fi";
import type { EnvironmentEntry } from "@/types/EnvironmentEntry";
// ====================================================================================================
// ====================================================================================================
const SplashScreen: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0d0f] text-white">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <FiBook className="text-6xl mb-4 animate-pulse" />
      <h1 className="text-2xl font-bold">Loading picBook...</h1>
    </motion.div>
  </div>
);
// ====================================================================================================
// ====================================================================================================
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0b0d0f]/60 backdrop-blur-md shadow-[#0b0d0f] shadow-2xl z-20">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-[#cdd6f4] flex items-center nordic-gradient-text">
            <FiBook className="inline-block mr-2" />
            picBook<span className="ml-2 text-xs">by Shovit</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
// ====================================================================================================
// ====================================================================================================
const Footer: React.FC = () => (
  <footer className="w-full bg-[#0b0d0f]/60 backdrop-blur-md py-4">
    <div className="container mx-auto px-4 flex justify-center items-center">
      <div className="text-[#cdd6f4]">© picBook 2024</div>
    </div>
  </footer>
);
// ====================================================================================================
// ====================================================================================================
const CardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [card, setCard] = useState<CardData | null>(null);
  useEffect(() => {
    if (!name) return;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, EnvironmentEntry> = await response.json();
        const cards: CardData[] = Object.values(data).map((entry) => ({
          title: entry.environment_title,
          moral: entry.environment_moral,
          description: entry.environment_prompt,
          images: entry.images.map((image) => ({ ...image, previewLink: atob(image.previewLink), downloadLink: atob(image.downloadLink) }))
        }));
        const matchedCard = cards.find((card) => card.title.toLowerCase() === name?.toLowerCase());
        if (!matchedCard) throw new Error("Card not found");
        setCard(matchedCard);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);
  const copyToClipboard = (color: string) => navigator.clipboard.writeText(color);
  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <SplashScreen />;
  return (
    <div className="min-h-screen text-[#cdd6f4]">
      <Header />
      <main className="container mx-auto px-4 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 px-4 bg-[#313244]/50 backdrop-blur-lg rounded-2xl p-4"
        >
          <h2 className="text-4xl font-bold nordic-gradient-text mb-2">{card?.title}</h2>
          <p className="text-[#a6adc8] mx-auto leading-relaxed text-sm">
            <span className="nordic-gradient-text font-bold text-lg">Environment: </span>
            {card?.description}
          </p>
          <p className="text-[#a6adc8] mx-auto leading-relaxed text-sm">
            <span className="nordic-gradient-text font-bold text-lg">Moral: </span>
            {card?.moral}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-start"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
        >
          {card?.images.map((image, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              className="overflow-hidden shadow-black shadow-2xl transition-shadow flex flex-col"
              style={{ padding: "2px", borderRadius: "1rem", background: `linear-gradient(135deg, ${image.primary}, ${image.secondary}, ${image.tertiary})` }}
            >
              <div className="bg-[#20212c] hover:bg-[#171820] rounded-2xl">
                <div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
                  <motion.div whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }} className="w-full h-full animate-pulse hover:animate-none">
                    <Image src={image.previewLink} alt={`Image ${idx + 1}`} layout="fill" className="object-cover" />
                  </motion.div>
                </div>
                <a
                  download
                  href={image.downloadLink}
                  className="block w-full px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] font-semibold shadow hover:bg-[#74c7ec] transition text-center justify-center items-center"
                >
                  <FiDownload className="inline-block mr-2 animate-bounce" />
                  Download (Highest Resolution)
                </a>
                <ul className="p-4 text-[#a6adc8] text-sm list-disc list-inside">
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">File Name:</span> {image.original_file_name}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Format:</span> {image.format}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Mode:</span> {image.mode}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Size:</span> {image.file_size_megabytes.toFixed(2)} MB ({image.file_size_bytes} bytes)
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Resolution:</span> {image.width} x {image.height}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Primary Color:</span> {image.primary}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Secondary Color:</span> {image.secondary}
                  </li>
                  <li>
                    <span className="font-medium nordic-gradient-text text-lg">Tertiary Color:</span> {image.tertiary}
                  </li>
                </ul>
                <div className="flex gap-2 flex-wrap p-4">
                  {Object.keys(image)
                    .filter((key) => key.startsWith("more_") || ["primary", "secondary", "tertiary"].includes(key))
                    .map((colorKey) => {
                      const colorValue = image[colorKey] as string;
                      return (
                        <motion.div key={colorKey} className="relative group cursor-pointer" whileHover={{ scale: 1.2 }} onClick={() => copyToClipboard(colorValue)}>
                          <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center" style={{ backgroundColor: colorValue }}>
                            <FiClipboard className="text-white text-sm" />
                          </div>
                          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-[#1e1e2e] text-white text-xs px-2 py-1 rounded shadow hidden group-hover:block">{colorValue}</div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
      <Galaxy isModalOpen={false} />
    </div>
  );
};

export default CardPage;
