import Link from "next/link";
import { Product, formatPrice, toBengaliNumber, getUnitBn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-200"
    >
      {/* Top Header: Image icon + Name + Unit */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-full bg-[#f6f7f5] flex items-center justify-center text-2xl shrink-0">
          {product.image}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-900 text-base leading-snug">
            {product.nameBn}
          </h3>
          <span className="text-xs text-gray-400 font-medium">
            প্রতি {getUnitBn(product.unit)}
          </span>
        </div>
      </div>

      {/* Bottom Row: Today's Price + Direction Badge */}
      <div className="flex items-end justify-between">
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
          className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-red-50 text-red-500"
              : isDown
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp && "▲"}
          {isDown && "▼"}
          {!isUp && !isDown && "—"}
          <span>{toBengaliNumber(Math.abs(product.change.pct))}%</span>
        </div>
      </div>
    </Link>
  );
}
