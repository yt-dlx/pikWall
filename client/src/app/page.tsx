// src/app/page.tsx
"use client";
import React from "react";
import Galaxy from "@/components/galaxy";

const PicBookPage: React.FC = () => {
  return (
    <>
      <Galaxy />
      <main>
        <header className="p-4 bg-[#3c3836] shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-[#fe8019]">PicBook</h1>
          </div>
        </header>
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fabd2f] to-[#d3869b]">Discover Stunning Wallpapers on PicBook</h2>
          <p className="text-[#928374] max-w-2xl mx-auto mt-4">Browse a vast collection of high-quality wallpapers to personalize your devices.</p>
        </section>
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-3xl font-bold">Trending Wallpapers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">{/* Add dynamic wallpaper elements */}</div>
        </section>
        <footer className="bg-[#3c3836] p-6 text-center mt-12">
          <p className="text-[#928374]">© 2024 PicBook. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default PicBookPage;
