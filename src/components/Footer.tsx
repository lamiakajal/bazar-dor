import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding & Mission Statement */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold">
              <span>🛒</span>
              <span>বাজার দর (BazarDor)</span>
            </div>
            <p className="text-sm text-neutral-content/80 max-w-md">
              প্রতিদিনের বাজার দরের নির্ভরযোগ্য তথ্য, বিশ্লেষণ ও তুলনামূলক চিত্র
              এক জায়গায়।
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="link link-hover">
              হোম
            </Link>
            <Link href="/profile" className="link link-hover">
              প্রোফাইল
            </Link>
            <a href="#সব-পণ্য" className="link link-hover">
              বাজার তালিকা
            </a>
          </div>
        </div>

        <div className="divider my-6 border-neutral-content/20"></div>

        {/* Legal Disclaimer & Attribution */}
        <div className="text-center text-xs text-neutral-content/60">
          <p>© {new Date().getFullYear()} বাজার দর। সকল অধিকার সংরক্ষিত।</p>
          <p className="mt-1">
            বাজারের মূল্যের তথ্যসমূহ বিভিন্ন বাজার মনিটরিং ডাটাবেজ থেকে
            সংগ্রহিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
