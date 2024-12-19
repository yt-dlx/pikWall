// src/components/AdSense.tsx
import Script from "next/script";
import React from "react";
const AdSense = () => {
  return <Script async crossOrigin="anonymous" strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9464475307933754" />;
};
export default AdSense;
