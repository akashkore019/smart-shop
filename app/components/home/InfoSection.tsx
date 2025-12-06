"use client";

import { SHOP_NAME, SHOP_WHATSAPP, SHOP_MAP_URL } from "@/lib/config";
import Link from "next/link";

export default function InfoSection() {
  return (
    <section className="mb-8 grid md:grid-cols-2 gap-6">
      {/* About Store */}
      <div className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-2xl border-2 border-emerald-100 shadow-lg">
        <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">🏪</span>
          About Our Store
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {SHOP_NAME} is your trusted neighborhood kirana store serving the Alandi community. 
          We offer a wide range of daily essentials, pooja items, cleaning supplies, and household products 
          at competitive prices with fast delivery.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-emerald-600">✓</span>
            <span>500+ Quality Products</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-emerald-600">✓</span>
            <span>Same Day Delivery Available</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-emerald-600">✓</span>
            <span>Open 7 Days a Week</span>
          </div>
        </div>
      </div>

      {/* Store Hours & Contact */}
      <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border-2 border-blue-100 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">⏰</span>
          Store Hours
        </h3>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="font-semibold text-gray-700">Monday - Saturday</span>
            <span className="text-emerald-600 font-bold">8:00 AM - 9:00 PM</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="font-semibold text-gray-700">Sunday</span>
            <span className="text-emerald-600 font-bold">8:00 AM - 8:00 PM</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <a
            href={`https://wa.me/${SHOP_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-600 transition-all text-center text-sm flex items-center justify-center gap-2"
          >
            💬 WhatsApp
          </a>
          <a
            href={SHOP_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-all text-center text-sm flex items-center justify-center gap-2"
          >
            📍 Directions
          </a>
        </div>
      </div>
    </section>
  );
}
