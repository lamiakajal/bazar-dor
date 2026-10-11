"use client";

import React, { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadTickerData() {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
          const data: Product[] = await res.json();
          if (isMounted) setProducts(data);
        }
      } catch (err) {
        console.error("Ticker fetch error:", err);
      }
    }

    loadTickerData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (products.length === 0) return null;

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  // Smooth seamless infinite scroll array
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#f9faf8] border-t border-[#e5e9e2] overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap py-2.5 flex items-center">
        {tickerItems.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <span
              key={`${product.id}-${index}`}
              className="inline-flex items-center gap-2 mx-6 text-base text-gray-800"
            >
              <span className="text-xl">{product.image}</span>
              <span className="font-semibold text-gray-800">
                {product.nameBn}
              </span>
              <span className="text-gray-600">
                {formatPrice(product.today)} টাকা/
                {unitMap[product.unit] || product.unit}
              </span>
              <span
                className={`font-bold inline-flex items-center gap-0.5 ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-[#107c41]"
                      : "text-gray-400"
                }`}
              >
                {isUp && "▲"}
                {isDown && "▼"}
                {!isUp && !isDown && "—"}
                <span>
                  {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
