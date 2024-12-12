// src/app/page.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    const fetchBase64Image = async () => {
      const response = await fetch("/api/proxy?filename=picbook.jpg&source=preview");
      if (!response.ok) throw new Error("Failed to fetch image");
      const base64Data = await response.text();
      setImageUrl(base64Data);
    };
    fetchBase64Image();
  }, []);

  const handleDownload = async (filename: string) => {
    const response = await fetch(`/api/proxy?filename=${filename}`);
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
  };

  return (
    <div>
      {imageUrl ? (
        <>
          <Image src={imageUrl} alt="Preview" width={500} height={500} unoptimized />
          <button onClick={() => handleDownload("picbook.jpg")} style={{ marginTop: "10px" }}>
            Download
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
