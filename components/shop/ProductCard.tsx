"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center border border-emerald-50">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="object-cover"
          />
        ) : (
          <span className="text-2xl">🛒</span>
        )}
      </div>

      <h3 className="font-semibold text-xs line-clamp-2 text-gray-800">
        {product.name}
      </h3>
      <p className="text-[11px] text-gray-500 mt-1">{product.sku}</p>
      <p className="mt-1 text-emerald-700 font-bold">
        ₹{product.price}{" "}
        <span className="text-[11px] text-gray-500">/ {product.unit}</span>
      </p>

      {isOutOfStock ? (
        <p className="text-[11px] text-red-500 mt-1 font-semibold">
          Out of stock
        </p>
      ) : product.stock <= 5 ? (
        <p className="text-[11px] text-orange-500 mt-1">
          Low stock: {product.stock}
        </p>
      ) : (
        <p className="text-[11px] text-gray-400 mt-1">
          In stock: {product.stock}
        </p>
      )}

      <button
        className={`mt-3 w-full text-xs px-3 py-1.5 rounded-lg font-medium transition ${
          isOutOfStock
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
        disabled={isOutOfStock}
        onClick={() => !isOutOfStock && onAddToCart(product)}
      >
        {isOutOfStock ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}
