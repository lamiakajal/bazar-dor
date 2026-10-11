"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, formatPrice, toBengaliNumber } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchTickerData() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (res.ok) {
          const data: Product[] = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load ticker data", error);
      }
    }
    fetchTickerData();
  }, []);

  if (products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#f7f9f6] border-y border-gray-200/80 overflow-hidden py-2 text-xs">
      <div className="animate-marquee items-center gap-4">
        {tickerItems.map((item, index) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 bg-white border border-gray-200 rounded-md hover:border-emerald-400 transition-colors shadow-2xs"
            >
              <span className="text-sm">{item.image}</span>
              <span className="font-semibold text-gray-800">{item.nameBn}</span>
              <span className="text-gray-600">
                ৳{formatPrice(item.today)} টাকা/
                {item.unit === "kg" ? "কেজি" : item.unit}
              </span>
              <span
                className={`font-bold inline-flex items-center gap-0.5 ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-emerald-600"
                      : "text-gray-400"
                }`}
              >
                {isUp && "▲"}
                {isDown && "▼"}
                {!isUp && !isDown && "—"}
                {toBengaliNumber(item.change.pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
