"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch latest market commodity prices for ticker strip
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

  // Duplicate items array to achieve a seamless infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-base-200 border-b border-base-300 overflow-hidden py-2 text-xs">
      <div className="animate-marquee items-center gap-6">
        {tickerItems.map((item, index) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={`${item.id}-${index}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap px-2"
            >
              <span>{item.image}</span>
              <span className="font-medium text-base-content">
                {item.nameBn}
              </span>
              <span className="font-semibold text-base-content/80">
                ৳ {formatPrice(item.today)}
              </span>
              <span
                className={`font-bold flex items-center gap-0.5 ${
                  isUp
                    ? "text-error"
                    : isDown
                      ? "text-success"
                      : "text-base-content/60"
                }`}
              >
                {isUp && "▲"}
                {isDown && "▼"}
                {!isUp && !isDown && "—"}
                {item.change.pct}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
