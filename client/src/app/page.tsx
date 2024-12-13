// src/app/page.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBase64Image = async () => {
      try {
        const response = await fetch(`/api/proxy?filename=${encodeURIComponent("City Of Dreams (1).jpg")}&source=preview`);
        if (!response.ok) throw new Error("Failed to fetch image");
        const base64Data = await response.text();
        setImageUrl(base64Data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchBase64Image();
  }, []);

  const handleDownload = async (filename: string) => {
    try {
      const response = await fetch(`/api/proxy?filename=${encodeURIComponent(filename)}`);
      if (!response.ok) throw new Error("Failed to set download link");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {imageUrl ? (
        <div className="flex flex-col items-center">
          <Image src={imageUrl} alt="Preview" width={500} height={500} className="rounded shadow-lg" unoptimized />
          <button
            onClick={() => handleDownload("City Of Dreams (1).jpg")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Download
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-[500px] h-[500px] bg-gray-200 rounded shadow-md">
          <h1 className="text-gray-500">Loading...</h1>
        </div>
      )}
    </div>
  );
}
