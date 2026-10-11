import Link from "next/link";
import { Product, formatPrice, toBengaliNumber, getUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const formattedPct = toBengaliNumber(Math.abs(product.change.pct).toFixed(1));

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col justify-between bg-white rounded-2xl border border-[#e5e9e2] p-5 shadow-xs transition-all duration-200 hover:border-[#107c41] hover:shadow-md hover:-translate-y-0.5"
    >
      <div>
        {/* Top Header: Image icon + Name + Unit */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-full bg-[#f6f7f5] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-200">
            {product.image}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#107c41] transition-colors truncate">
              {product.nameBn}
            </h3>
            <span className="text-xs text-gray-400 font-medium mt-0.5">
              প্রতি {getUnitBn(product.unit)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Today's Price + Direction Badge */}
      <div className="flex items-end justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900 leading-none">
              {formatPrice(product.today)}
            </span>
            <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </div>
        </div>

        {/* Change Indicator Pill */}
        <div
          className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-red-50 text-red-500 border border-red-100"
              : isDown
                ? "bg-emerald-50 text-[#107c41] border border-emerald-100"
                : "bg-gray-100 text-gray-500 border border-gray-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{formattedPct}%</span>
        </div>
      </div>
    </Link>
  );
}
