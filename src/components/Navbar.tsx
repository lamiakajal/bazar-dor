"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Category } from "@/lib/utils";
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

  // Handle user authentication termination
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
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-primary"
            >
              <span className="text-2xl">🛒</span>
              <span>বাজার দর</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                href="/"
                className={`btn btn-sm btn-ghost ${pathname === "/" ? "btn-active font-bold" : ""}`}
              >
                সব পণ্য
              </Link>
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className={`btn btn-sm btn-ghost ${isActive ? "btn-active font-bold" : ""}`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Authentication Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-primary"></span>
            ) : session?.user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 flex items-center justify-center bg-primary text-primary-content font-bold">
                    {session.user.image ? (
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
                  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
                >
                  <li className="menu-title px-4 py-2 font-semibold text-base-content border-b border-base-200 mb-1">
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
              <div className="flex items-center gap-2">
                <Link href="/signin" className="btn btn-sm btn-ghost">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-sm btn-primary">
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost btn-circle"
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
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-base-200 bg-base-100 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`btn btn-sm justify-start btn-ghost ${pathname === "/" ? "btn-active font-bold" : ""}`}
            >
              সব পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`btn btn-sm justify-start btn-ghost ${
                  pathname === `/category/${cat.slug}`
                    ? "btn-active font-bold"
                    : ""
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>

          <div className="divider my-2"></div>

          <div>
            {session?.user ? (
              <div className="space-y-2">
                <div className="text-sm font-semibold px-2">
                  {session.user.name}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm btn-outline w-full justify-start"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-error btn-outline w-full justify-start"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm btn-outline"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm btn-primary"
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
