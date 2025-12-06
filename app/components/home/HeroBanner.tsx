"use client";

import { SHOP_NAME } from "@/lib/config";

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-8 mb-6 shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            ⚡ OPEN NOW
          </span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Free Delivery Available
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Welcome to {SHOP_NAME}
        </h1>
        
        <p className="text-emerald-50 text-base mb-6 max-w-2xl">
          Your trusted local kirana store for daily essentials, pooja items, cleaning supplies & more. 
          Quality products at affordable prices! 🛍️
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2">
            🛒 Shop Now
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
            📞 Contact Us
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-emerald-100">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-xs text-emerald-100">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.8⭐</div>
            <div className="text-xs text-emerald-100">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
