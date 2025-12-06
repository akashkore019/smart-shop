"use client";

import Link from "next/link";
import { SHOP_MAP_URL, SHOP_NAME } from "@/app/lib/config";

type Props = {
  cartCount: number;
  onCartClick: () => void;
  onMenuToggle: () => void;
};



export default function HeaderBar({ cartCount, onCartClick, onMenuToggle }: Props) {
  return (
    <header className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-emerald-100">
      <button
        className="text-emerald-700 text-2xl mr-3 hover:bg-emerald-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        onClick={onMenuToggle}
      >
        ☰
      </button>

      <div className="flex-1 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          {SHOP_NAME}
        </h1>
        <Link
          href={SHOP_MAP_URL}
          target="_blank"
          className="text-emerald-600 text-xs flex items-center justify-center gap-1 hover:text-emerald-700 transition-colors mt-1"
        >
          📍 View on Map
        </Link>
      </div>

      <button
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        onClick={onCartClick}
      >
        <span className="text-lg">🛒</span>
        <span className="font-semibold">Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
