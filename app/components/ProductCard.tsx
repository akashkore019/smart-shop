"use client";

import { Product } from "@/app/data/products";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center">
      {/* Placeholder image / icon */}
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
        🛒
      </div>

      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
      <p className="text-[11px] text-gray-500 mt-1">{product.sku}</p>
      <p className="mt-1 text-blue-600 font-bold">
        ₹{product.price} <span className="text-xs text-gray-500">/ {product.unit}</span>
      </p>

      {isOutOfStock ? (
        <p className="text-xs text-red-500 mt-1 font-semibold">Out of stock</p>
      ) : product.stock <= 5 ? (
        <p className="text-xs text-orange-500 mt-1">Low stock: {product.stock}</p>
      ) : (
        <p className="text-xs text-gray-400 mt-1">In stock: {product.stock}</p>
      )}

      <button
        className={`mt-3 w-full text-sm px-3 py-1.5 rounded-lg font-medium transition ${
          isOutOfStock
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isOutOfStock}
        onClick={() => !isOutOfStock && onAddToCart(product)}
      >
        {isOutOfStock ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}
