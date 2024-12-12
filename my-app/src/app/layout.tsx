import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimpleBar from "simplebar-react";
import { Kurale } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const kurale = Kurale({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = { title: "picBook - Galaxy of Stories", description: "Explore a universe of short stories with moral lessons and downloadable images" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={kurale.className}>
        <SimpleBar style={{ maxHeight: "100vh" }}>
          <div className="flex flex-col min-h-screen bg-gruvbox-bg0">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SimpleBar>
      </body>
    </html>
  );
}
