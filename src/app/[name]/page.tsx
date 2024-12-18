// src/app/[name]/page.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardProps } from "@/types/CardProps";
import { useSearchParams } from "next/navigation";
import { FiDownload, FiBookOpen } from "react-icons/fi";
import { EnvironmentEntry } from "@/types/EnvironmentEntry";
import { FaBookOpen, FaRegCompass, FaRegHeart } from "react-icons/fa";

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 w-full bg-[#0b0d0f]/60 backdrop-blur-md shadow-2xl z-20">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-[#cdd6f4]">
        <FiBookOpen className="inline-block mr-2" />
        picBook
      </h1>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="w-full bg-[#0b0d0f]/60 backdrop-blur-md py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="text-[#cdd6f4]">© picBook 2024</div>
      <div className="flex space-x-4 text-[#a6adc8]">
        <FaRegCompass />
        <FaRegHeart />
        <FaBookOpen />
      </div>
    </div>
  </footer>
);

const CardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [card, setCard] = useState<CardProps["card"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    const fetchData = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Record<string, EnvironmentEntry> = await response.json();
        const cards = Object.values(data).map((entry) => ({
          title: entry.environment_title,
          description: entry.environment_prompt,
          images: entry.images.map((image) => ({ ...image, downloadLink: atob(image.downloadLink), previewLink: atob(image.previewLink) }))
        }));
        const matchedCard = cards.find((card) => card.title.toLowerCase() === name.toLowerCase());
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
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-[#1e1e2e] min-h-screen text-[#cdd6f4]">
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold">{card?.title}</h2>
        <p>{card?.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {card?.images.map((image, idx) => (
            <div key={idx} className="relative">
              <Image src={image.previewLink} alt={`Image ${idx + 1}`} width={400} height={300} className="rounded shadow" />
              <a href={image.downloadLink} download>
                <FiDownload className="absolute top-2 right-2 text-2xl text-white" />
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CardPage;
