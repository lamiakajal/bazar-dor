"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { isPending } = useSession();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("নতুন পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (res?.error) {
        toast.error(res.error.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে");
      } else {
        toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! 🎉");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#107c41]"></span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2e1d] tracking-tight">
            পাসওয়ার্ড পরিবর্তন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            অ্যাকাউন্টের সুরক্ষার জন্য শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-gray-800 block">
                বর্তমান পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="বর্তমান পাসওয়ার্ড দিন"
                className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#107c41] focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-gray-800 block">
                নতুন পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#107c41] focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-gray-800 block">
                নতুন পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
                className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#107c41] focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#0a7a3b] hover:bg-[#07632f] active:scale-[0.98] disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md mt-2"
            >
              {loading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/profile"
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← প্রোফাইলে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
