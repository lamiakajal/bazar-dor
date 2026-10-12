import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full bg-[#f4f6f2] min-h-[calc(100vh-140px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#e5e9e2] p-6 sm:p-10 text-center shadow-xs space-y-5 sm:space-y-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-[#f4f6f2] border border-[#e2e7df] flex items-center justify-center text-3xl sm:text-4xl shadow-2xs">
          🔍
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <span className="text-3xl sm:text-4xl font-black text-[#107c41]">
            ৪০৪
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a2e1d] tracking-tight">
            পেজটি পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-sm mx-auto">
            আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি অথবা ঠিকানাটি ভুল হতে পারে।
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-2.5 sm:py-3 px-5 sm:px-6 bg-[#107c41] hover:bg-[#0c6133] active:scale-95 text-white font-bold text-xs sm:text-sm md:text-base rounded-xl shadow-md shadow-[#107c41]/20 transition-all duration-200"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
