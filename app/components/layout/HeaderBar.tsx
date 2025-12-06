"use client";

import Link from "next/link";
import { SHOP_MAP_URL, SHOP_NAME } from "@/app/lib/config";

type Props = {
  cartCount: number;
  onCartClick: () => void;
};

export default function HeaderBar({ cartCount, onCartClick }: Props) {
  return (
    <header className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-xl font-bold text-emerald-700">
          {SHOP_NAME}
        </h1>
        <Link
          href={SHOP_MAP_URL}
          target="_blank"
          className="text-emerald-700 text-xs flex items-center gap-1 underline underline-offset-2"
        >
          📍 View on Map
        </Link>
      </div>

      <button
        className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-sm shadow-sm"
        onClick={onCartClick}
      >
        🛒 Cart
        {cartCount > 0 && (
          <span className="ml-1 px-2 rounded-full bg-white text-emerald-700 text-xs font-semibold">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
