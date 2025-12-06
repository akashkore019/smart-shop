"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOP_WHATSAPP } from "@/lib/config";

const menuData = [
  {
    name: "Pooja Samagri",
    icon: "🪔",
    sub: ["Agarbatti", "Camphor", "Matchbox"],
  },
  {
    name: "Cleaning Essentials",
    icon: "🧼",
    sub: ["Harpic", "Phenyl", "Mop"],
  },
  {
    name: "Kitchen Essentials",
    icon: "🍽️",
    sub: ["Dish Bar", "Scrubber", "Napkins"],
  },
  {
    name: "Disposable Items",
    icon: "🥤",
    sub: ["Paper Cups", "Plates"],
  },
  {
    name: "Plastics & Dustbins",
    icon: "🗑️",
    sub: ["Bucket", "Dustbin"],
  },
  {
    name: "Hardware Items",
    icon: "🛠️",
    sub: [],
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn" onClick={onClose} />
      <aside className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col overflow-y-auto animate-slideIn">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              📋 Menu
            </h2>
            <button
              onClick={onClose}
              className="text-white text-xl hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>
          <p className="text-emerald-100 text-sm">Browse by categories</p>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {menuData.map((cat) => (
            <div key={cat.name} className="bg-white border-2 border-emerald-100 rounded-xl p-3 hover:border-emerald-300 hover:shadow-md transition-all">
              <p className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </p>
              {cat.sub.length > 0 && (
                <ul className="pl-8 mt-2 space-y-1 text-sm text-gray-600">
                  {cat.sub.map((s) => (
                    <li
                      key={s}
                      className="hover:text-emerald-700 cursor-pointer hover:translate-x-1 transition-all flex items-center gap-2 before:content-['•'] before:text-emerald-500"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 space-y-3 bg-gradient-to-t from-emerald-50 to-white border-t-2 border-emerald-100">
          <a
            className="block bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            href={`https://wa.me/${SHOP_WHATSAPP}`}
            target="_blank"
          >
            💬 WhatsApp Us
          </a>

          <Link
            href="/contact"
            className="block text-center py-3 border-2 border-emerald-600 rounded-xl font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            📞 Contact Us
          </Link>

          <p className="text-xs text-gray-400 text-center pt-2">
            © Mega Store {new Date().getFullYear()}
          </p>
        </div>
      </aside>
    </>
  );
}
