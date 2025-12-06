"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-30 bg-gradient-to-r from-emerald-600 to-green-600 text-white w-12 h-12 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center font-bold text-xl animate-fadeIn"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
