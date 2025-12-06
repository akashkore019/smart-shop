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
      <div className="fixed inset-0 bg-black/40 z-30" onClick={onClose} />
      <aside className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-40 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            className="text-sm text-gray-500 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">
              No items in cart. Add something from the list.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.sku}
                className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {item.product.sku} • ₹{item.product.price} /{" "}
                    {item.product.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-sm"
                    onClick={() => onUpdateQty(item.product.sku, -1)}
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm"
                    onClick={() => onUpdateQty(item.product.sku, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg text-emerald-700">
              ₹{total}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 border border-gray-300 text-sm rounded-lg py-2"
              onClick={onClear}
              disabled={items.length === 0}
            >
              Clear Cart
            </button>
            <button
              className={`flex-1 text-sm rounded-lg py-2 font-semibold ${
                items.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
              disabled={items.length === 0}
              onClick={onCheckoutClick}
            >
              Checkout via WhatsApp 📲
            </button>
          </div>

          <p className="text-[11px] text-gray-400">
            You can confirm address & payment in WhatsApp chat.
          </p>
        </div>
      </aside>
    </>
  );
}
