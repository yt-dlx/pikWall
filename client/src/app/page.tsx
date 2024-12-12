// // src/app/page.tsx
// "use client";
// import Image from "next/image";
// import { useState, useEffect, JSX } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface ImageData {
//   artStyle: string;
//   scenario: string;
//   colorScheme: string;
//   imageName: string;
//   urls?: { resolution: string; url: string }[];
//   timestamp: string;
// }
// interface GroupedImages {
//   [artStyle: string]: {
//     [scenario: string]: {
//       [colorScheme: string]: ImageData[];
//     };
//   };
// }

// function HeroSection({ handleExploreClick }: { handleExploreClick: () => void }): JSX.Element {
//   const [previousSlide, setPreviousSlide] = useState<number>(0);
//   const [currentSlide, setCurrentSlide] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [images, setImages] = useState<ImageData[]>([]);
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch("/api/images");
//         if (!response.ok) throw new Error("Failed to fetch images");
//         const data: ImageData[] = await response.json();
//         const shuffledImages = data.sort(() => Math.random() - 0.5);
//         setImages(shuffledImages);
//         setIsLoading(false);
//       } catch {
//         setError("Failed to load images");
//         setIsLoading(false);
//       }
//     };
//     fetchImages();
//   }, []);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setPreviousSlide(currentSlide);
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(intervalId);
//   }, [currentSlide, images.length]);
//   if (isLoading) return <div>Loading...</div>;
//   if (error || images.length === 0) return <div>{error || "No images available"}</div>;

//   return (
//     <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center z-10">
//       <AnimatePresence mode="sync">
//         {[previousSlide, currentSlide].map((slideId) => (
//           <motion.div key={slideId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0">
//             <Image
//               fill
//               alt={images[slideId].imageName}
//               className="object-cover object-center w-full h-full"
//               src={images[slideId].urls?.[2].url || images[slideId].urls?.[1].url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiKeTsm26jLOx1RQhXGkRSPWNj2tCeMKdUA&s"}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent backdrop-blur-md" />
//           </motion.div>
//         ))}
//       </AnimatePresence>
//       <div className="relative w-full max-w-7xl mx-auto z-20">
//         <div className="text-center backdrop-blur-md p-10 sm:p-16 md:p-24 lg:p-32 xl:p-44 rounded-3xl animated-nord-border shadow-black shadow-2xl">
//           <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-Brittany text-[#eceff4] mb-4 nord-text glitch" data-text="picbook">
//             picbook
//           </h1>
//           <p className="pt-4 sm:pt-8 max-w-md mx-auto text-lg sm:text-xl md:text-2xl text-[#ffffff] md:mt-5 md:max-w-3xl">
//             Dive into a world of captivating stories, where every wallpaper tells a unique, AI-crafted tale.{" "}
//           </p>
//           <div className="mt-6 sm:mt-10 flex justify-center">
//             <button
//               onClick={handleExploreClick}
//               className="py-2 sm:py-3 px-4 sm:px-6 w-full sm:w-auto border-2 font-bold rounded-2xl text-[#eceff4] bg-[#eceff42a] hover:bg-[#eceff4] hover:text-[#2e3440] transition-colors duration-500 nord-border text-sm sm:text-base"
//             >
//               Explore AI-Generated Story Wallpapers
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }
// function GallerySection({ groupIMG }: { groupIMG: GroupedImages }): JSX.Element {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
//   const getImageUrl = (image: ImageData, quality: string): string => {
//     if (!image.urls || image.urls.length === 0) return "";
//     const url = image.urls.find((u) => u.resolution === quality)?.url;
//     return url || image.urls[0].url;
//   };
//   const handleCategoryClick = (category: string) => {
//     setActiveCategory(activeCategory === category ? null : category);
//     setActiveSubcategory(null);
//   };
//   const handleSubcategoryClick = (subcategory: string) => setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory);
//   return (
//     <motion.section id="gallery" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="py-10 sm:py-14 md:py-20 z-10 relative">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
//         <div className="text-center mb-8 sm:mb-12">
//           <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#ffffff] mb-4 nord-text glitch" data-text="Explore Story Gallery">
//             Explore Story Gallery
//           </h3>
//           <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-[#ffffff]">Discover our collection of immersive narratives</p>
//         </div>
//         <div className="mb-8 p-3 sm:p-4 bg-[#121214] shadow-lg shadow-black rounded-lg">
//           <h4 className="text-2xl font-bold text-[#eceff4] mb-4">{activeCategory ? `👀 Viewing > ${activeCategory}` : "💡 Categories"}</h4>
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {Object.keys(groupIMG).map((artStyle, index) => (
//               <motion.button
//                 key={index}
//                 whileHover={{ scale: 1.02 }}
//                 onClick={() => handleCategoryClick(artStyle)}
//                 className={`relative h-24 sm:h-32 md:h-40 w-full rounded-lg overflow-hidden shadow shadow-black holographic cursor-pointer group ${
//                   activeCategory === artStyle ? "border border-[#5e6e72]" : ""
//                 }`}
//               >
//                 <Image
//                   fill
//                   alt={artStyle}
//                   className={`object-cover object-center transition-transform duration-500 ${activeCategory === artStyle ? "scale-150" : "group-hover:scale-125"}`}
//                   src={
//                     Object.values(groupIMG[artStyle])[0][Object.keys(Object.values(groupIMG[artStyle])[0])[0]][0].urls?.[2]?.url ||
//                     Object.values(groupIMG[artStyle])[0][Object.keys(Object.values(groupIMG[artStyle])[0])[0]][0].urls?.[1]?.url ||
//                     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiKeTsm26jLOx1RQhXGkRSPWNj2tCeMKdUA&s"
//                   }
//                 />
//                 <div className={`absolute inset-0 ${activeCategory === artStyle ? "" : "bg-black/70"} group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center p-2`}>
//                   <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#ffffff] nord-text text-center">{artStyle}</h3>
//                 </div>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//         {activeCategory && (
//           <div className="mb-8 p-3 sm:p-4 bg-[#18181b] shadow-lg shadow-black rounded-lg">
//             <h4 className="text-2xl font-bold text-[#eceff4] mb-4">{activeSubcategory ? `👓 Viewing > ${activeSubcategory}` : "💡 SubCategories"}</h4>
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Object.keys(groupIMG[activeCategory]).map((scenario, index) => (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() => handleSubcategoryClick(scenario)}
//                   className={`relative h-24 sm:h-32 md:h-40 w-full rounded-lg overflow-hidden shadow-lg shadow-black holographic cursor-pointer group ${
//                     activeSubcategory === scenario ? "border border-[#5e6e72]" : ""
//                   }`}
//                 >
//                   <Image
//                     fill
//                     alt={scenario}
//                     className={`object-cover object-center transition-transform duration-500 ${activeSubcategory === scenario ? "scale-150" : "group-hover:scale-125"}`}
//                     src={
//                       Object.values(groupIMG[activeCategory][scenario])[0][0].urls?.[2]?.url ||
//                       Object.values(groupIMG[activeCategory][scenario])[0][0].urls?.[1]?.url ||
//                       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiKeTsm26jLOx1RQhXGkRSPWNj2tCeMKdUA&s"
//                     }
//                   />
//                   <div
//                     className={`absolute inset-0 ${activeSubcategory === scenario ? "" : "bg-black/70"} group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center p-2`}
//                   >
//                     <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#ffffff] nord-text text-center">{scenario}</h3>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         )}
//         {activeCategory &&
//           activeSubcategory &&
//           Object.entries(groupIMG[activeCategory][activeSubcategory]).map(([colorScheme, images]) => (
//             <div key={colorScheme} className="mb-8 p-3 sm:p-4 bg-[#1c1c20] shadow-lg shadow-black rounded-lg animated-nord-border">
//               <h5 className="text-lg font-semibold text-[#eceff4] mb-4">{colorScheme}</h5>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {images.map((image, imageIndex) => (
//                   <motion.div
//                     key={imageIndex}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: imageIndex * 0.1 }}
//                     className="relative aspect-w-14 aspect-h-12 rounded-md overflow-hidden group shadow-lg shadow-black"
//                   >
//                     {image.urls && image.urls.length > 0 ? (
//                       <Image src={getImageUrl(image, "1792x1024")} alt={image.imageName} fill className="object-cover transition-transform duration-500 group-hover:scale-125" />
//                     ) : (
//                       <div className="flex items-center justify-center w-full h-full bg-gray-500">No Image Available</div>
//                     )}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
//                       <h6 className="text-sm font-medium text-white mb-2">{image.imageName}</h6>
//                       {image.urls && image.urls.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {image.urls.map((url, i) => (
//                             <a
//                               key={i}
//                               href={url.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="px-2 py-1 bg-white/30 text-white text-xs rounded hover:bg-white/50 transition-colors duration-300 backdrop-blur-sm"
//                             >
//                               {url.resolution}
//                             </a>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     </motion.section>
//   );
// }
// export default function Home(): JSX.Element {
//   const [groupIMG, setGroupedImages] = useState<GroupedImages>({});
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/images");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data: ImageData[] = await response.json();
//         const grouped = data.reduce((acc: GroupedImages, image) => {
//           if (!acc[image.artStyle]) acc[image.artStyle] = {};
//           if (!acc[image.artStyle][image.scenario]) acc[image.artStyle][image.scenario] = {};
//           if (!acc[image.artStyle][image.scenario][image.colorScheme]) acc[image.artStyle][image.scenario][image.colorScheme] = [];
//           acc[image.artStyle][image.scenario][image.colorScheme].push(image);
//           return acc;
//         }, {});
//         setGroupedImages(grouped);
//       } catch {
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   const handleExploreClick = (): void => {
//     const gallerySection = document.getElementById("gallery");
//     if (gallerySection) gallerySection.scrollIntoView({ behavior: "smooth" });
//   };
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-black via-[#151618] to-[#1c1e20]">
//         <p className="text-center text-3xl sm:text-5xl md:text-7xl font-Brittany animate-pulse text-[#eceff4]">Loading, please wait...</p>
//       </div>
//     );
//   }
//   if (error || Object.keys(groupIMG).length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-black via-[#151618] to-[#1c1e20]">
//         <p className="text-center text-3xl sm:text-5xl md:text-7xl font-Brittany text-[#eceff4]">{error || "Failed to load data"}</p>
//       </div>
//     );
//   }
//   return (
//     <main className="bg-black font-bold font-Kurale text-[#eceff4] h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#eceff4] scrollbar-track-[#151618] relative">
//       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg p-4 bg-black/60 text-[#eceff4]/60 shadow-2xl shadow-black">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//               </svg>
//             </div>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//               <li>
//                 <a className="nord-text">Frequently Asked</a>
//               </li>
//               <li>
//                 <a className="nord-text">About picbook</a>
//               </li>
//               <li>
//                 <a className="nord-text">Contact Developer</a>
//               </li>
//             </ul>
//           </div>
//           <a className="font-bold text-xl text-[#ffffff] nord-text">picbook</a>
//         </div>
//         <div className="navbar-end">
//           <a className="font-bold text-[#ffffff] nord-text">Copyright (c)</a>
//         </div>
//       </nav>
//       <HeroSection handleExploreClick={handleExploreClick} />
//       <GallerySection groupIMG={groupIMG} />
//       <footer className="text-[#eceff4] p-8">
//         <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
//           <div className="mb-4 sm:mb-0">
//             <h2 className="text-2xl font-bold text-[#ffffff] mb-2 nord-text">picbook</h2>
//             <p className="text-sm">© 2024 picbook. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PreviewImage() {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    const fetchBase64Image = async () => {
      try {
        const response = await fetch("/api/proxy?filename=picbook.jpg&source=preview");
        if (!response.ok) throw new Error("Failed to fetch image");
        const base64Data = await response.text();
        setBase64Image(base64Data);
        console.log(base64Data);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };
    fetchBase64Image();
  }, []);

  return <div>{base64Image ? <Image src={base64Image} alt="Preview" width={500} height={500} /> : <p>Loading...</p>}</div>;
}
