"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Category, getBanglaDate } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch product categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );
        if (res.ok) {
          const data: Category[] = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }
    loadCategories();
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="bg-white border-b border-gray-100">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo and Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-sm">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </span>
            <span className="text-xs text-gray-500 font-medium mt-0.5">
              {getBanglaDate()}
            </span>
          </div>
        </Link>

        {/* Auth Buttons / Profile */}
        <div className="hidden sm:flex items-center gap-4">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-emerald-600"></span>
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring-2 ring-emerald-500 ring-offset-2 overflow-hidden flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold">
                  {session.user.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                    />
                  ) : (
                    <span>{session.user.name?.charAt(0) || "U"}</span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-gray-100"
              >
                <li className="menu-title px-4 py-2 font-semibold text-gray-800 border-b border-gray-100 mb-1">
                  {session.user.name}
                </li>
                <li>
                  <Link href="/profile">প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-error">
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-emerald-600"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

      {/* Categories Strip */}
      <div className="border-t border-gray-100 bg-[#fbfbfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none text-sm">
            <Link
              href="/"
              className={`whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
                pathname === "/"
                  ? "font-bold text-emerald-700 bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-600"
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
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-md transition-colors ${
                    isActive
                      ? "font-bold text-emerald-700 bg-emerald-50"
                      : "text-gray-600 hover:text-emerald-600"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4">
          <div className="flex flex-col gap-2">
            {session?.user ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-800">
                  {session.user.name}
                </p>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-gray-600 py-1"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block text-sm text-red-500 py-1 text-left w-full"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm border border-gray-200 rounded-lg text-gray-700"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm bg-emerald-600 text-white rounded-lg"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
