import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Configure Google font with required weights and language subsets
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Global SEO metadata definition
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
        {/* Sticky navigation header placeholder */}
        {/* <Navbar /> */}

        {/* Dynamic route outlet and main page content */}
        <main className="flex-1">{children}</main>

        {/* Global application footer placeholder */}
        {/* <Footer /> */}

        {/* Global notification dispatcher */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
