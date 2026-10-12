"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const userName = session?.user?.name || "ইউজার";
  const userImage = session?.user?.image || null;
  const userEmail = session?.user?.email || "";

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল হয়েছে!");
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a2e1d] tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-[#d2e2c7] shrink-0 bg-gray-100 shadow-2xs flex items-center justify-center">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#107c41] text-white flex items-center justify-center font-bold text-2xl uppercase">
                  {userName ? userName.charAt(0) : "U"}
                </div>
              )}
            </div>
            <div className="space-y-0.5 text-left">
              <h2 className="text-lg sm:text-xl font-bold text-[#1a2e1d]">
                {userName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 border border-[#f3c1be] text-[#d93829] hover:bg-red-50 hover:border-red-300 active:scale-[0.98] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <span className="text-sm">↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#e5e9e2] p-6 sm:p-8 shadow-xs space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-[#1a2e1d] text-left">
            তথ্য
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-gray-800 block">
                নাম
              </label>
              <div className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5">
                {userName}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href="/profile/update"
                className="w-full py-2.5 px-4 bg-[#0a7a3b] hover:bg-[#07632f] active:scale-[0.98] text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
              >
                <span>✏️</span>
                <span>তথ্য আপডেট করুন</span>
              </Link>

              <Link
                href="/profile/password"
                className="w-full py-2.5 px-4 bg-white border border-[#d2e2c7] hover:bg-[#f8faf7] hover:border-[#b8cfab] active:scale-[0.98] text-gray-700 font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs"
              >
                <span>🔒</span>
                <span>পাসওয়ার্ড পরিবর্তন</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
