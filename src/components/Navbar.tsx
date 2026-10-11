"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Category, getBanglaDate } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";
import PriceTicker from "@/components/PriceTicker";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync category collection on mount
  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to retrieve taxonomy data");
        const data: Category[] = await res.json();
        if (isMounted) setCategories(data);
      } catch (err) {
        console.error("Category taxonomy fetch error:", err);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Invalidate current auth session and redirect home
  const handleSignOut = useCallback(async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");
            router.push("/");
          },
        },
      });
    } catch (err) {
      console.error("Sign-out dispatch error:", err);
      toast.error("সাইন আউট করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
    }
  }, [router]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e7ece4] shadow-xs">
      {/* Primary header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          <div className="w-11 h-11 rounded-xl bg-[#107c41] flex items-center justify-center text-white text-2xl shadow-xs transition-transform duration-200 group-hover:scale-105">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#1f2937] leading-tight">
              বাজার দর
            </span>
            <span className="text-sm text-[#4b5563] font-medium mt-0.5">
              {getBanglaDate()}
            </span>
          </div>
        </Link>

        {/* Desktop auth actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-md text-[#107c41]"></span>
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full ring-2 ring-[#107c41] ring-offset-2 overflow-hidden flex items-center justify-center bg-[#ecfdf5] text-[#107c41] text-base font-bold">
                  {session.user.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                    />
                  ) : (
                    <span>{session.user.name?.charAt(0) || "U"}</span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-3 z-50 p-2 shadow-lg bg-white rounded-xl w-56 border border-[#e5e9e2] text-base"
              >
                <li className="menu-title px-4 py-2 font-bold text-gray-800 border-b border-gray-100 mb-1">
                  {session.user.name}
                </li>
                <li>
                  <Link href="/profile" className="py-2">
                    প্রোফাইল
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-red-500 py-2">
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="w-28 h-10 inline-flex items-center justify-center text-base font-semibold text-[#1f2937] rounded-xl border border-transparent transition-all duration-300 ease-out hover:text-white hover:bg-[#107c41] hover:border-[#107c41] hover:shadow-md active:scale-95"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="w-28 h-10 inline-flex items-center justify-center text-base font-semibold text-[#1f2937] rounded-xl border border-transparent transition-all duration-300 ease-out hover:text-white hover:bg-[#107c41] hover:border-[#107c41] hover:shadow-md active:scale-95"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-gray-700 hover:text-[#107c41] rounded-lg transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Category scroll bar */}
      <div className="border-t border-[#e7ece4] bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Commodity categories"
            className="flex items-center gap-7 overflow-x-auto py-2.5 scrollbar-none text-base"
          >
            <Link
              href="/"
              className={`whitespace-nowrap px-3 py-1 rounded-lg transition-all duration-150 ${
                pathname === "/"
                  ? "font-medium text-[#107c41] bg-[#e7f3eb]"
                  : "text-[#374151] hover:text-[#107c41]"
              }`}
            >
              সব পণ্য
            </Link>
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 rounded-lg transition-all duration-150 ${
                    isActive
                      ? "font-medium text-[#107c41] bg-[#e7f3eb]"
                      : "text-[#374151] hover:text-[#107c41]"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile drawer panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#e7ece4] bg-white px-5 py-5 space-y-4">
          {session?.user ? (
            <div className="space-y-3">
              <p className="text-base font-bold text-gray-800">
                {session.user.name}
              </p>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-gray-700 py-1.5"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={handleSignOut}
                className="block text-base text-red-500 py-1.5 text-left w-full font-medium"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 inline-flex items-center justify-center text-base font-semibold text-[#1f2937] rounded-xl border border-gray-200 transition-all duration-200 hover:text-white hover:bg-[#107c41] hover:border-[#107c41] active:scale-95"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 inline-flex items-center justify-center text-base font-semibold text-[#1f2937] rounded-xl border border-gray-200 transition-all duration-200 hover:text-white hover:bg-[#107c41] hover:border-[#107c41] active:scale-95"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Live Market Price Ticker */}
      <PriceTicker />
    </header>
  );
}
