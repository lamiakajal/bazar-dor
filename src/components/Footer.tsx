import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#e5e9e2] text-gray-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <Link
              href="/"
              className="inline-flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-[#1a2e1d] hover:text-[#107c41] transition-colors"
            >
              <span className="text-2xl">🛒</span>
              <span>বাজার দর</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              প্রয়োজনীয় পণ্যের দাম এক নজরে। প্রতিদিনের বাজার দরের নির্ভরযোগ্য
              তথ্য ও বিশ্লেষণ।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium">
            <Link href="/" className="hover:text-[#107c41] transition-colors">
              হোম
            </Link>
            <Link
              href="/profile"
              className="hover:text-[#107c41] transition-colors"
            >
              প্রোফাইল
            </Link>
            <a
              href="#sobb-ponno"
              className="hover:text-[#107c41] transition-colors"
            >
              বাজার তালিকা
            </a>
          </div>
        </div>

        <div className="border-t border-[#e5e9e2] my-5 sm:my-6"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left text-xs text-gray-400">
          <p>© {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-center sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
}
