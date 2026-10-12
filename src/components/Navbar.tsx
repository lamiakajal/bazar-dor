"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) throw new Error("Failed to retrieve taxonomy data");
        const data: Category[] = await res.json();
        if (isMounted) setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Category taxonomy fetch error:", err);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল!");
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error("Sign-out dispatch error:", err);
      toast.error("সাইন আউট করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
    }
  }, [router]);

  const userName = session?.user?.name || "ইউজার";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e7ece4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
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

        <div className="hidden sm:flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-md text-[#107c41]"></span>
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2.5 p-1.5 pr-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-[#e5e9e2] cursor-pointer select-none transition-all"
              >
                <div className="relative w-9 h-9 rounded-full ring-2 ring-[#107c41] ring-offset-1 overflow-hidden flex items-center justify-center bg-[#ecfdf5] shrink-0">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#107c41] text-white flex items-center justify-center font-bold text-sm uppercase">
                      {userName ? userName.charAt(0) : "U"}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {userName}
                </span>
                <span className="text-xs text-gray-400">▾</span>
              </div>

              <div
                tabIndex={0}
                className="dropdown-content mt-2 z-50 bg-white rounded-2xl w-64 p-4 border border-[#e5e9e2] shadow-xl space-y-3"
              >
                <div className="border-b border-gray-100 pb-2.5 text-left">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {userName}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 truncate font-normal">
                    {userEmail}
                  </p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-gray-700 hover:text-[#107c41] hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>আমার প্রোফাইল</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
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
                  key={cat.id || cat.slug}
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

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#e7ece4] bg-white px-5 py-5 space-y-4">
          {session?.user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#107c41] flex items-center justify-center bg-[#ecfdf5] shrink-0">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#107c41] text-white flex items-center justify-center font-bold text-sm uppercase">
                      {userName ? userName.charAt(0) : "U"}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-gray-700 py-1.5 text-left"
              >
                প্রোফাইল
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
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

      <PriceTicker />
    </header>
  );
}
