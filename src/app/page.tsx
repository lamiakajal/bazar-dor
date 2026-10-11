"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product, getBanglaDate } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch commodity datasets on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
          const data: Product[] = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter top price increases
  const topRisers = useMemo(() => {
    return [...products]
      .filter((p) => p.change.dir === "up")
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6);
  }, [products]);

  // Filter top price decreases
  const topFallers = useMemo(() => {
    return [...products]
      .filter((p) => p.change.dir === "down")
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6);
  }, [products]);

  return (
    <div className="bg-[#f7f9f6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Figma Hero Banner Card */}
        <section className="bg-[#f2f5ef] border border-gray-200/60 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-8 space-y-4">
              <span className="inline-block bg-[#e1ebd9] text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-1 rounded-full">
                {getBanglaDate()}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              <div className="pt-2">
                <a
                  href="#sobb-ponno"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
                >
                  সব পণ্য দেখুন
                </a>
              </div>
            </div>

            {/* Right Basket Illustration */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-56 h-48 sm:w-64 sm:h-52 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 240 200"
                  className="w-full h-full drop-shadow-sm"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="120" cy="185" rx="85" ry="12" fill="#d9dfd4" />
                  <circle cx="85" cy="85" r="30" fill="#f87171" />
                  <circle cx="150" cy="70" r="36" fill="#4ade80" />
                  <circle cx="125" cy="105" r="24" fill="#fb923c" />
                  <circle cx="175" cy="110" r="20" fill="#facc15" />
                  <circle cx="80" cy="120" r="18" fill="#c084fc" />
                  <path
                    d="M85 55 Q90 40 100 45"
                    stroke="#15803d"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M150 34 Q155 20 165 24"
                    stroke="#15803d"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M45 110 L60 170 C62 176 67 180 73 180 H167 C173 180 178 176 180 170 L195 110 Z"
                    fill="#92400e"
                  />
                  <path
                    d="M40 110 H200 C204 110 207 113 207 117 V120 H33 V117 C33 113 36 110 40 110 Z"
                    fill="#78350f"
                  />
                  <path d="M68 120 L80 180" stroke="#78350f" strokeWidth="3" />
                  <path
                    d="M102 120 L108 180"
                    stroke="#78350f"
                    strokeWidth="3"
                  />
                  <path
                    d="M138 120 L132 180"
                    stroke="#78350f"
                    strokeWidth="3"
                  />
                  <path
                    d="M172 120 L160 180"
                    stroke="#78350f"
                    strokeWidth="3"
                  />
                  <path d="M50 145 H190" stroke="#78350f" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
            <p className="mt-4 text-gray-500 text-sm">
              বাজারের তথ্য লোড হচ্ছে...
            </p>
          </div>
        ) : (
          <>
            {/* Top Price Risers */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-base">▲</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  আজ দাম বেড়েছে
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topRisers.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>

            {/* Top Price Fallers */}
            <section id="sobb-ponno" className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-base">▼</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  আজ দাম কমেছে
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topFallers.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
