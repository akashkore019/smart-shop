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
    <div className="relative min-h-screen bg-emerald-50">
      <main className="p-4 pb-24 max-w-3xl mx-auto">
        <HeaderBar
          cartCount={items.length}
          onCartClick={() => setCartOpen(true)}
        />

        <SearchBar value={search} onChange={setSearch} />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <section className="mt-4">
          <h2 className="mb-2 text-sm font-semibold text-emerald-900">
            Products
          </h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">
              No items found. Try another name, SKU or category.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
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
      </main>

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
    </div>
  );
}
