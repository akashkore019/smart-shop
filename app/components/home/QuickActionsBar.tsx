"use client";

import { SHOP_WHATSAPP, SHOP_MAP_URL } from "@/lib/config";

type Props = {
  onViewCart: () => void;
  cartCount: number;
};

export default function QuickActionsBar({ onViewCart, cartCount }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-200 shadow-2xl z-20 px-4 py-3">
      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-2">
        <button
          onClick={onViewCart}
          className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 transition-all relative"
        >
          <span className="text-2xl">🛒</span>
          <span className="text-xs font-semibold text-gray-700">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        <a
          href={`https://wa.me/${SHOP_WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 transition-all"
        >
          <span className="text-2xl">💬</span>
          <span className="text-xs font-semibold text-gray-700">WhatsApp</span>
        </a>

        <a
          href={SHOP_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 transition-all"
        >
          <span className="text-2xl">📍</span>
          <span className="text-xs font-semibold text-gray-700">Location</span>
        </a>

        <a
          href="tel:+919876543210"
          className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 transition-all"
        >
          <span className="text-2xl">📞</span>
          <span className="text-xs font-semibold text-gray-700">Call</span>
        </a>
      </div>
    </div>
  );
}
