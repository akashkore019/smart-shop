"use client";

import type { CartItem } from "@/app/lib/types";

type Props = {
  open: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onClear: () => void;
  onUpdateQty: (sku: string, delta: number) => void;
  onCheckoutClick: () => void;
};

export default function CartDrawer({
  open,
  items,
  total,
  onClose,
  onClear,
  onUpdateQty,
  onCheckoutClick,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 animate-fadeIn" onClick={onClose} />
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-40 flex flex-col animate-slideIn">
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🛒 Your Cart
          </h2>
          <button
            className="text-white text-xl hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50/30 to-white">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-6xl mb-4 opacity-50">🛒</div>
              <p className="text-gray-500 font-medium">
                No items in cart yet.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Add products from the shop!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.sku}
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md border border-emerald-100 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl flex items-center justify-center text-2xl">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.product.sku}
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">
                    ₹{item.product.price} / {item.product.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-xl">
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100 transition-all active:scale-95"
                    onClick={() => onUpdateQty(item.product.sku, -1)}
                  >
                    −
                  </button>
                  <span className="text-sm font-bold w-8 text-center text-emerald-700">
                    {item.quantity}
                  </span>
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold hover:shadow-md transition-all active:scale-95"
                    onClick={() => onUpdateQty(item.product.sku, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t-2 border-emerald-100 bg-white space-y-3 shadow-2xl">
          <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl">
            <span className="font-bold text-gray-700">Total Amount</span>
            <span className="font-bold text-2xl text-emerald-700">
              ₹{total}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 border-2 border-gray-300 text-sm rounded-xl py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClear}
              disabled={items.length === 0}
            >
              🗑️ Clear Cart
            </button>
            <button
              className={`flex-1 text-sm rounded-xl py-3 font-bold transition-all ${
                items.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
              }`}
              disabled={items.length === 0}
              onClick={onCheckoutClick}
            >
              Checkout 📲
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            ✨ Confirm address & payment via WhatsApp
          </p>
        </div>
      </aside>
    </>
  );
}
