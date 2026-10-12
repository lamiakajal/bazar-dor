"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

function UpdateForm({
  initialName,
  userEmail,
}: {
  initialName: string;
  userEmail: string;
}) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.updateUser({
        name: trimmedName,
      });

      if (res?.error) {
        toast.error(res.error.message || "আপডেট ব্যর্থ হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("আপডেট করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e9e2] p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-gray-800 block">
            ইমেইল (পরিবর্তনযোগ্য নয়)
          </label>
          <input
            type="email"
            disabled
            value={userEmail}
            className="w-full bg-gray-100 border border-[#d2e2c7] text-gray-500 text-sm rounded-lg px-3.5 py-2.5 cursor-not-allowed outline-none select-none"
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-gray-800 block">নাম</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম"
            className="w-full bg-[#fdfdfd] border border-[#d2e2c7] text-gray-800 text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#107c41] focus:bg-white transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-[#0a7a3b] hover:bg-[#07632f] active:scale-[0.98] disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
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
  );
}

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();

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
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচে নতুন নাম লিখুন।
          </p>
        </div>

        <UpdateForm
          initialName={session?.user?.name || ""}
          userEmail={session?.user?.email || ""}
        />
      </div>
    </div>
  );
}
