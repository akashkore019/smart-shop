"use client";

import { useMemo, useState } from "react";
import HeaderBar from "@/components/layout/HeaderBar";
import SearchBar from "@/components/shop/SearchBar";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductCard from "@/components/shop/ProductCard";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutDialog from "@/components/cart/CheckoutDialog";
import { useCart } from "@/hooks/useCart";
import { filterProducts } from "@/lib/search";
import type { Category, Product } from "@/lib/types";
import { SHOP_WHATSAPP } from "@/lib/config";
import Footer from "./components/layout/Footer";
import SideMenu from "./components/layout/SideMenu";
import HeroBanner from "./components/home/HeroBanner";
import FeaturesSection from "./components/home/FeaturesSection";
import OffersSection from "./components/home/OffersSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import QuickActionsBar from "./components/home/QuickActionsBar";
import InfoSection from "./components/home/InfoSection";
import ScrollToTop from "./components/common/ScrollToTop";
import PromoBanner from "./components/common/PromoBanner";

const categories: Category[] = [
  { name: "All", icon: "🛍️" },
  { name: "Pooja Samagri", icon: "🪔" },
  { name: "Cleaning Essentials", icon: "🧼" },
  { name: "Kitchen Essentials", icon: "🍽️" },
  { name: "Disposable Items", icon: "🥤" },
  { name: "Hardware Items", icon: "🛠️" },
  { name: "Plastics & Dustbins", icon: "🗑️" },
  { name: "Home Utility", icon: "🏡" },
];

type Props = {
  initialProducts: Product[];
};

export default function HomePageClient({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
const [menuOpen, setMenuOpen] = useState(false);

  const { items, total, addItem, updateQuantity, clearCart } =
    useCart();

  const filtered = useMemo(
    () => filterProducts(initialProducts, search, selectedCategory),
    [initialProducts, search, selectedCategory]
  );

  const buildWhatsAppMessage = () => {
    if (!items.length) return "";

    const lines: string[] = [];

    lines.push("🛒 Mega Store – New Order");
    lines.push("");

    items.forEach((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `${index + 1}) ${item.product.sku} – ${
          item.product.name
        } x ${item.quantity} = ₹${lineTotal}`
      );
    });

    lines.push("");
    lines.push(`Total: ₹${total}`);
    lines.push("");
    lines.push("Customer Info:");
    lines.push(`Name: ${customerName || "-"}`);
    lines.push(`Address: ${address || "-"}`);
    lines.push(`Payment Mode: ${paymentMode}`);
    lines.push("");
    lines.push("Source: Mega Store Online App");

    return lines.join("\n");
  };

  const handleWhatsAppOrder = () => {
    const msg = buildWhatsAppMessage();
    if (!msg) return;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${SHOP_WHATSAPP}?text=${encoded}`;
    window.open(url, "_blank");
  };

  const handleCheckoutConfirm = () => {
    setShowCheckout(false);
    handleWhatsAppOrder();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-50">
      <main className="p-5 pb-32 max-w-6xl mx-auto">
        <HeaderBar
          cartCount={items.length}
          onCartClick={() => setCartOpen(true)}
          onMenuToggle={() => setMenuOpen(true)}
        />

        <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        <PromoBanner />

        <HeroBanner />

        <FeaturesSection />

        <OffersSection />

        <SearchBar value={search} onChange={setSearch} />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              Browse Products
            </h2>
            <div className="bg-emerald-100 px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-emerald-700">
                {filtered.length} items
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-emerald-200 shadow-lg">
              <div className="text-7xl mb-4 opacity-50">🔍</div>
              <p className="text-lg text-gray-600 font-bold mb-2">
                No items found
              </p>
              <p className="text-sm text-gray-500">
                Try another name, SKU, or category
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((prod) => (
                <ProductCard
                  key={prod.sku}
                  product={prod}
                  onAddToCart={(p) => {
                    addItem(p);
                    setCartOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <TestimonialsSection />

        <InfoSection />
      </main>

      <ScrollToTop />

      <QuickActionsBar 
        onViewCart={() => setCartOpen(true)}
        cartCount={items.length}
      />

      <CartDrawer
        open={cartOpen}
        items={items}
        total={total}
        onClose={() => setCartOpen(false)}
        onClear={clearCart}
        onUpdateQty={updateQuantity}
        onCheckoutClick={() => setShowCheckout(true)}
      />

      <CheckoutDialog
        open={showCheckout}
        customerName={customerName}
        address={address}
        paymentMode={paymentMode}
        onChangeName={setCustomerName}
        onChangeAddress={setAddress}
        onChangePaymentMode={setPaymentMode}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleCheckoutConfirm}
      />

      <Footer />
    </div>
  );
}
