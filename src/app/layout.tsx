import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import "./globals.css";

// Configure Hind Siliguri font weights and subsets
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Global SEO application metadata
export const metadata: Metadata = {
  title: "বাজার দর (BazarDor)",
  description: "নিত্যপ্রয়োজনীয় দ্রব্যের দৈনিক বাজার দর ও পরিসংখ্যান",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${hindSiliguri.className} antialiased bg-base-100 text-base-content min-h-screen flex flex-col`}
      >
        {/* Real-time market commodity ticker */}
        <PriceTicker />

        {/* Main sticky navigation header */}
        <Navbar />

        {/* Application route content */}
        <main className="flex-1">{children}</main>

        {/* Global application footer */}
        <Footer />

        {/* Central notification toaster */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
