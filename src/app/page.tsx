"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import InitialLoader from "@/components/InitialLoader";
import { Product, getBanglaDate, toBengaliNumber } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

function ProductCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#e5e9e2] p-5 shadow-xs animate-pulse">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
          <div className="h-3 bg-gray-100 rounded-md w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between pt-3 border-t border-gray-100">
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded-md w-14" />
          <div className="h-6 bg-gray-200 rounded-md w-24" />
        </div>
        <div className="h-6 bg-gray-100 rounded-full w-14" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
          const data: Product[] = await res.json();
          if (isMounted) setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const topRisers = useMemo(() => {
    return [...products]
      .filter((p) => p.change.dir === "up")
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6);
  }, [products]);

  const topFallers = useMemo(() => {
    return [...products]
      .filter((p) => p.change.dir === "down")
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6);
  }, [products]);

  return (
    <>
      <InitialLoader />

      <div className="w-full bg-[#f4f6f2] min-h-screen py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ebf3e8] to-[#e1ecd9] border border-[#d2e2c7] p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="w-full md:w-3/5 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 bg-[#d7e9cb] text-[#107c41] text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-[#c1deae]">
                  <span>📅</span>
                  <span>{getBanglaDate()}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1a2e1d] leading-tight">
                  আজকের বাজারের দর এক নজরে
                </h1>

                <p className="text-sm sm:text-base text-[#4a5f4e] leading-relaxed max-w-xl font-medium">
                  চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম —
                  সর্বনিম্ন, সর্বোচ্চ এবং দৈনিক পরিবর্তন এক ক্লিকেই জানুন।
                </p>

                <div className="pt-2">
                  <a
                    href="#sobb-ponno"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#107c41] hover:bg-[#0c6133] active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-[#107c41]/20 transition-all duration-200"
                  >
                    সব পণ্য দেখুন ↓
                  </a>
                </div>
              </div>

              <div className="w-full md:w-2/5 flex justify-center md:justify-end">
                <div className="w-48 h-44 sm:w-60 sm:h-52 shrink-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 240 200"
                    className="w-full h-full drop-shadow-md"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="120" cy="185" rx="85" ry="12" fill="#cbd7c5" />
                    <circle cx="85" cy="85" r="28" fill="#f87171" />
                    <circle cx="150" cy="72" r="34" fill="#34d399" />
                    <circle cx="125" cy="100" r="24" fill="#fb923c" />
                    <circle cx="170" cy="105" r="20" fill="#facc15" />
                    <circle cx="80" cy="115" r="18" fill="#c084fc" />
                    <path
                      d="M85 58 Q90 42 100 47"
                      stroke="#107c41"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M150 38 Q155 22 165 26"
                      stroke="#107c41"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M48 112 L62 170 C64 175 69 178 75 178 H165 C171 178 176 175 178 170 L192 112 Z"
                      fill="#9a5b1f"
                    />
                    <path
                      d="M42 110 H198 C202 110 205 113 205 116 V118 H35 V116 C35 113 38 110 42 110 Z"
                      fill="#784110"
                    />
                    <path
                      d="M70 118 L82 178"
                      stroke="#784110"
                      strokeWidth="3"
                    />
                    <path
                      d="M104 118 L108 178"
                      stroke="#784110"
                      strokeWidth="3"
                    />
                    <path
                      d="M136 118 L132 178"
                      stroke="#784110"
                      strokeWidth="3"
                    />
                    <path
                      d="M170 118 L158 178"
                      stroke="#784110"
                      strokeWidth="3"
                    />
                    <path d="M52 144 H188" stroke="#784110" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-sm">▲</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1f2937]">
                    আজ দাম বেড়েছে
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topRisers.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#107c41] text-sm">▼</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1f2937]">
                    আজ দাম কমেছে
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topFallers.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </section>

              <section id="sobb-ponno" className="space-y-4 pt-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1f2937]">
                    সব পণ্য
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    মোট {toBengaliNumber(products.length)}টি পণ্য • প্রদর্শিত
                    হচ্ছে
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
