"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Category, Product, toBengaliNumber } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

type SortOption = "default" | "price-asc" | "price-desc";

function ProductSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#e5e9e2] p-4 sm:p-5 shadow-xs animate-pulse">
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

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(false);

        const [productRes, categoryRes] = await Promise.all([
          fetch(`${API_BASE}/products?category=${slug}`),
          fetch(`${API_BASE}/categories/${slug}`),
        ]);

        if (productRes.ok && categoryRes.ok) {
          const [productData, categoryData]: [Product[], Category] =
            await Promise.all([productRes.json(), categoryRes.json()]);

          if (isMounted) {
            setProducts(Array.isArray(productData) ? productData : []);
            setCategory(categoryData);
          }
        } else {
          const [fallbackProdRes, fallbackCatRes] = await Promise.all([
            fetch(`${API_BASE}/products`),
            fetch(`${API_BASE}/categories`),
          ]);

          if (fallbackProdRes.ok && fallbackCatRes.ok) {
            const [allProds, allCats]: [Product[], Category[]] =
              await Promise.all([
                fallbackProdRes.json(),
                fallbackCatRes.json(),
              ]);

            if (isMounted) {
              setProducts(allProds.filter((item) => item.category === slug));
              setCategory(allCats.find((c) => c.slug === slug) || null);
            }
          } else {
            if (isMounted) setError(true);
          }
        }
      } catch (err) {
        console.error("Failed to load category products", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    const getProductPrice = (item: Product) => {
      const record = item as unknown as Record<string, unknown>;
      const pObj = (record.prices || record.price) as
        | Record<string, number>
        | undefined;
      return (
        item.today ??
        pObj?.avg ??
        pObj?.current ??
        (typeof record.currentPrice === "number" ? record.currentPrice : 0)
      );
    };

    if (sortBy === "price-asc") {
      return list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-[#107c41] transition-colors">
            হোম
          </Link>
          <span>/</span>
          <span className="text-[#107c41] font-medium truncate max-w-50">
            {category?.nameBn || slug}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#f4f6f2] border border-[#e2e7df] flex items-center justify-center text-2xl sm:text-4xl shrink-0 shadow-2xs">
              {category?.icon || "🍚"}
            </div>
            <div className="space-y-0.5 text-left">
              <h1 className="text-lg sm:text-2xl font-black text-[#1a2e1d] tracking-tight">
                {category?.nameBn || slug}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t border-[#f0f3ed] sm:border-t-0">
            <label
              htmlFor="sort-select"
              className="text-xs sm:text-sm font-normal text-gray-500 shrink-0"
            >
              সাজান:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#f8faf7] border border-[#d2e2c7] text-gray-800 text-xs sm:text-sm rounded-xl pl-3.5 pr-8 py-2 font-medium outline-none focus:border-[#107c41] cursor-pointer"
              >
                <option value="default">ডিফল্ট</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500 text-xs">
                ▾
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={`cat-skel-${i}`} />
            ))}
          </div>
        ) : error || sortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5e9e2] py-14 sm:py-20 px-4 text-center space-y-4">
            <div className="text-4xl sm:text-5xl">🌾</div>
            <h3 className="text-base sm:text-xl font-bold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              অনুগ্রহ করে অন্য কোনো ক্যাটাগরি নির্বাচন করুন অথবা হোম পেজে ফিরে
              যান।
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#107c41] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:bg-[#0c6133] transition-colors"
              >
                হোমে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {sortedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
