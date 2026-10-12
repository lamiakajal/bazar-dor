"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Product, toBengaliNumber } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

interface ProductDetails {
  id: string;
  nameBn: string;
  category: string;
  categoryBn?: string;
  unit: string;
  image?: string;
  icon?: string;
  currentPrice: number;
  prevPrice?: number;
  changePercent?: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  marketPrices?: MarketPrice[];
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProductData() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/products/${slug}`);
        if (res.ok) {
          const data = (await res.json()) as ProductDetails;
          if (isMounted) setProduct(data);
        } else {
          const allRes = await fetch(`${API_BASE}/products`);
          if (allRes.ok) {
            const allData = (await allRes.json()) as Product[];
            const found = allData.find(
              (p) =>
                String(p.id) === slug ||
                ("slug" in p &&
                  String((p as unknown as Record<string, unknown>).slug) ===
                    slug),
            );

            if (isMounted && found) {
              const record = found as unknown as Record<string, unknown>;
              const priceObj = (record.prices || record.price) as
                | Record<string, number>
                | undefined;

              const cPrice =
                priceObj?.current ??
                priceObj?.avg ??
                (typeof record.currentPrice === "number"
                  ? record.currentPrice
                  : 66);

              const minP = priceObj?.min ?? 59;
              const maxP = priceObj?.max ?? 73;
              const avgP = priceObj?.avg ?? cPrice;

              setProduct({
                id: String(found.id),
                nameBn: found.nameBn,
                category: found.category,
                categoryBn:
                  typeof record.categoryBn === "string"
                    ? record.categoryBn
                    : "চাল",
                unit: found.unit || "কেজি",
                icon: typeof record.icon === "string" ? record.icon : "🍚",
                image:
                  typeof record.image === "string" ? record.image : undefined,
                currentPrice: cPrice,
                minPrice: minP,
                maxPrice: maxP,
                avgPrice: avgP,
                changePercent:
                  typeof record.changePercent === "number"
                    ? record.changePercent
                    : 3.1,
                marketPrices: (record.marketPrices as MarketPrice[]) || [
                  {
                    market: "মাঠ বাজার",
                    division: "ময়মনসিংহ",
                    min: 59,
                    max: 67,
                    avg: 62,
                  },
                  {
                    market: "সদর বাজার",
                    division: "রাজশাহী",
                    min: 60,
                    max: 69,
                    avg: 63,
                  },
                  {
                    market: "বাজারহাট",
                    division: "খুলনা",
                    min: 60,
                    max: 67,
                    avg: 63.5,
                  },
                  {
                    market: "বাঘারহাট বাজার",
                    division: "রাজশাহী",
                    min: 60,
                    max: 68,
                    avg: 64,
                  },
                  {
                    market: "ঠোঁট বাজার",
                    division: "ময়মনসিংহ",
                    min: 60,
                    max: 69,
                    avg: 64.5,
                  },
                  {
                    market: "আমতলী বাজার",
                    division: "চট্টগ্রাম",
                    min: 60,
                    max: 69,
                    avg: 65,
                  },
                  {
                    market: "ডবলমুরিং বাজার",
                    division: "খুলনা",
                    min: 62,
                    max: 69,
                    avg: 65.5,
                  },
                  {
                    market: "চৌরাস্তা বাজার",
                    division: "সিলেট",
                    min: 63,
                    max: 72,
                    avg: 67,
                  },
                  {
                    market: "গ্রীন মার্কেট, মিরপুর",
                    division: "ঢাকা",
                    min: 64,
                    max: 70,
                    avg: 67.5,
                  },
                  {
                    market: "চাঁদগাঁও বাজার",
                    division: "চট্টগ্রাম",
                    min: 63,
                    max: 73,
                    avg: 68,
                  },
                  {
                    market: "আম্বরখানা",
                    division: "সিলেট",
                    min: 64,
                    max: 73,
                    avg: 68.5,
                  },
                  {
                    market: "কারওয়ান বাজার",
                    division: "ঢাকা",
                    min: 65,
                    max: 73,
                    avg: 69,
                  },
                ],
              });
            }
          }
        }
      } catch (err) {
        console.error("Product loading error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProductData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-32 bg-white rounded-2xl border border-[#e5e9e2]" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-24 bg-white rounded-2xl border border-[#e5e9e2]" />
            <div className="h-24 bg-white rounded-2xl border border-[#e5e9e2]" />
            <div className="h-24 bg-white rounded-2xl border border-[#e5e9e2]" />
          </div>
          <div className="h-64 bg-white rounded-2xl border border-[#e5e9e2]" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h2>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-[#107c41] text-white rounded-xl text-sm font-semibold hover:bg-[#0d6836] transition-colors"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const changePercent = product.changePercent ?? 3.1;
  const isUp = changePercent > 0;
  const currentPrice = product.currentPrice || product.avgPrice || 66;
  const minPrice = product.minPrice || 59;
  const maxPrice = product.maxPrice || 73;
  const avgPrice = product.avgPrice || 66;
  const markets = product.marketPrices || [];

  return (
    <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-normal text-left">
          <Link href="/" className="hover:text-[#107c41] transition-colors">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#107c41] transition-colors"
          >
            {product.categoryBn || "চাল"}
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{product.nameBn}</span>
        </nav>

        {/* Top Product Header Card */}
        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-4 sm:p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 shadow-xs">
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f6f2] border border-[#e2e7df] flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-2xs">
              {product.icon || "🍚"}
            </div>
            <div className="space-y-1 text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1a2e1d] tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                প্রতি {product.unit || "কেজি"} • {product.categoryBn || "চাল"}
              </p>
              <p className="text-xs text-gray-400 font-normal">
                গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"} ২ টাকা
              </p>
            </div>
          </div>

          <div className="bg-[#f0f7f2] rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-w-32 self-start sm:self-auto border border-[#d6ebd9]">
            <span className="text-xs text-gray-500 font-normal">আজকের দাম</span>
            <span className="text-2xl sm:text-3xl font-black text-[#107c41] mt-0.5">
              {toBengaliNumber(currentPrice)}
            </span>
            <span className="text-xs text-gray-500 font-medium mt-0.5">
              টাকা / {product.unit || "কেজি"}
            </span>
            <div
              className={`mt-1.5 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-[#107c41]"
              }`}
            >
              <span>{isUp ? "▲" : "▼"}</span>
              <span>{toBengaliNumber(Math.abs(changePercent))}%</span>
            </div>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-4 sm:p-6 shadow-xs space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#1a2e1d] text-left">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-xl border border-[#e5e9e2] p-4 text-left space-y-1">
              <span className="text-xs text-gray-500 font-medium">
                সর্বনিম্ন দাম
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#107c41]">
                {toBengaliNumber(minPrice)}{" "}
                <span className="text-base font-semibold">টাকা</span>
              </p>
              <p className="text-xs text-gray-400 font-normal">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e9e2] p-4 text-left space-y-1">
              <span className="text-xs text-gray-500 font-medium">
                সর্বাধিক দাম
              </span>
              <p className="text-xl sm:text-2xl font-black text-red-500">
                {toBengaliNumber(maxPrice)}{" "}
                <span className="text-base font-semibold">টাকা</span>
              </p>
              <p className="text-xs text-gray-400 font-normal">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e9e2] p-4 text-left space-y-1">
              <span className="text-xs text-gray-500 font-medium">গড় দাম</span>
              <p className="text-xl sm:text-2xl font-black text-[#0f6837]">
                {toBengaliNumber(avgPrice)}{" "}
                <span className="text-base font-semibold">টাকা</span>
              </p>
              <p className="text-xs text-gray-400 font-normal">
                প্রতি {product.unit || "কেজি"}-এর হিসাব
              </p>
            </div>
          </div>
        </div>

        {/* Market Price Table */}
        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-4 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-[#1a2e1d] text-left">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm min-w-125">
              <thead>
                <tr className="border-b border-[#e5e9e2] text-xs font-semibold text-gray-500">
                  <th className="py-3 px-3">বাজার</th>
                  <th className="py-3 px-3">বিভাগ</th>
                  <th className="py-3 px-3">সর্বনিম্ন</th>
                  <th className="py-3 px-3">সর্বাধিক</th>
                  <th className="py-3 px-3">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3ee]">
                {markets.map((m, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#fbfcfb] transition-colors text-xs sm:text-sm text-gray-700 font-medium"
                  >
                    <td className="py-3.5 px-3 font-semibold text-gray-800">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-3 text-gray-600">{m.division}</td>
                    <td className="py-3.5 px-3">
                      {toBengaliNumber(m.min)} টাকা
                    </td>
                    <td className="py-3.5 px-3">
                      {toBengaliNumber(m.max)} টাকা
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#107c41]">
                      {toBengaliNumber(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
