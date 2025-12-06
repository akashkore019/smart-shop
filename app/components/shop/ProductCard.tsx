"use client";

import Image from "next/image";
import type { Product } from "@/app/lib/types";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-2 border-emerald-100 hover:border-emerald-300 hover:-translate-y-1 group">
      <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl flex items-center justify-center mb-3 overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-inner">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            className="object-cover"
          />
        ) : (
          <span className="text-3xl">🛒</span>
        )}
      </div>

      <h3 className="font-bold text-sm line-clamp-2 text-gray-800 min-h-[2.5rem] flex items-center">
        {product.name}
      </h3>
      <p className="text-[11px] text-gray-500 mt-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{product.sku}</p>
      <p className="mt-2 text-emerald-700 font-bold text-lg">
        ₹{product.price}{" "}
        <span className="text-xs text-gray-500 font-normal">/ {product.unit}</span>
      </p>

      {isOutOfStock ? (
        <p className="text-xs text-red-500 mt-2 font-bold bg-red-50 px-3 py-1 rounded-full">
          ⚠️ Out of stock
        </p>
      ) : product.stock <= 5 ? (
        <p className="text-xs text-orange-600 mt-2 font-semibold bg-orange-50 px-3 py-1 rounded-full">
          ⚡ Low stock: {product.stock}
        </p>
      ) : (
        <p className="text-xs text-green-600 mt-2 bg-green-50 px-3 py-1 rounded-full font-medium">
          ✓ In stock: {product.stock}
        </p>
      )}

      <button
        className={`mt-4 w-full text-sm px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
          isOutOfStock
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
        }`}
        disabled={isOutOfStock}
        onClick={() => !isOutOfStock && onAddToCart(product)}
      >
        {isOutOfStock ? "🚫 Unavailable" : "🛒 Add to Cart"}
      </button>
    </div>
  );
}
