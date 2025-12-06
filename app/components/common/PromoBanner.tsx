"use client";

import { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-3 mb-4 rounded-2xl shadow-lg relative overflow-hidden animate-fadeIn">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl animate-bounce">🎉</span>
            <span className="font-bold text-sm">SPECIAL OFFER!</span>
          </div>
          <p className="text-xs text-white/90">
            Get 10% OFF on your first order above ₹500. Use code: <span className="font-bold bg-white/20 px-2 py-0.5 rounded">FIRST10</span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0"
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
