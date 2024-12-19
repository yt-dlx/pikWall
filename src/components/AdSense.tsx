// src/components/AdSense.tsx
import Script from "next/script";
import React from "react";
const AdSense = () => {
  return <Script async crossOrigin="anonymous" strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.pub_id}`} />;
};
export default AdSense;
