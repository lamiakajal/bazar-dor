"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn.email({ email, password });
      if (res?.error) {
        const errorMsg = res.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("সাইন ইন সফল হয়েছে! 🎉");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      const fallbackMsg = "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setError(fallbackMsg);
      toast.error(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError("");
    try {
      const targetUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}${callbackUrl}`
          : callbackUrl;

      await signIn.social({
        provider,
        callbackURL: targetUrl,
      });
    } catch {
      const socialErrorMsg = "সোশ্যাল সাইন ইনে ত্রুটি হয়েছে";
      setError(socialErrorMsg);
      toast.error(socialErrorMsg);
    }
  };

  return (
    <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-10 sm:py-14 px-4 sm:px-6">
      <div className="text-center space-y-1 mb-7 sm:mb-8 transition-all duration-700 ease-out animate-[fadeDown_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2e1d] tracking-tight">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-115 bg-white rounded-2xl border border-[#e5e9e2] p-6 sm:p-9 shadow-xs space-y-4 transition-all duration-700 ease-out animate-[cardEntrance_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-2.5 text-center font-medium animate-[pulse_0.4s_ease-in-out]">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-1.5 group">
            <label className="text-sm font-medium text-gray-800 block text-left transition-colors duration-200 group-focus-within:text-[#107c41]">
              ইমেইল
            </label>
            <div className="relative rounded-lg transition-transform duration-200 ease-out group-focus-within:-translate-y-0.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all duration-300 ease-out focus:border-[#107c41] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,124,65,0.12)] hover:border-[#b2cfa5]"
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-sm font-medium text-gray-800 block text-left transition-colors duration-200 group-focus-within:text-[#107c41]">
              পাসওয়ার্ড
            </label>
            <div className="relative rounded-lg transition-transform duration-200 ease-out group-focus-within:-translate-y-0.5">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-all duration-300 ease-out focus:border-[#107c41] focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,124,65,0.12)] hover:border-[#b2cfa5]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#0a7a3b] hover:bg-[#07632f] active:scale-[0.98] disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer mt-1 shadow-xs hover:shadow-md"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-3.5">
          <div className="border-t border-[#e5e9e2] w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 font-normal absolute">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 py-2.5 px-3 sm:px-5 border border-[#d2e2c7] bg-white hover:bg-[#f8faf7] hover:border-[#b8cfab] active:scale-[0.97] rounded-lg text-xs sm:text-sm font-bold text-gray-700 cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 py-2.5 px-3 sm:px-5 border border-[#d2e2c7] bg-white hover:bg-[#f8faf7] hover:border-[#b8cfab] active:scale-[0.97] rounded-lg text-xs sm:text-sm font-bold text-gray-700 cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-xs"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 font-normal pt-1">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-[#0a7a3b] font-medium hover:underline transition-colors"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 font-normal transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      <style jsx global>{`
        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeDown {
          0% {
            opacity: 0;
            transform: translateY(-12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f6f2]" />}>
      <SignInContent />
    </Suspense>
  );
}
