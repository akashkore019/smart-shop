"use client";

import { useState, ChangeEvent, useMemo } from "react";
import ProductCard from "@/app/components/ProductCard";
import { products, Product } from "@/app/data/products";

type Category = {
  name: string;
  icon: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

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

const SHOP_WHATSAPP = "918805925386"; // +91 + your number

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [showCheckout, setShowCheckout] = useState(false);
const [customerName, setCustomerName] = useState("");
const [address, setAddress] = useState("");
const [paymentMode, setPaymentMode] = useState("Cash");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryClick = (name: string) => {
    setSelectedCategory(name);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.sku === product.sku);
      if (existing) {
        // increase qty (basic Indian style — no variant confusion)
        return prev.map((item) =>
          item.product.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true); // open cart when something added
  };

  const handleUpdateQty = (sku: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.sku === sku
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return products.filter((p) => {
      if (p.status !== "active") return false;

      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchSearch =
        query === "" ||
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory]);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const buildWhatsAppMessage = () => {
    if (cartItems.length === 0) return "";

    const lines: string[] = [];
    lines.push("Namaste! 🙏");
    lines.push("I want to place an order from your shop:");
    lines.push("");

    cartItems.forEach((item) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `${item.product.sku} - ${item.product.name} x ${item.quantity} = ₹${lineTotal}`
      );
    });

    lines.push("");
    lines.push(`Total: ₹${cartTotal}`);
    lines.push("");
    lines.push("Name: ");
    lines.push("Address / Landmark: ");
    lines.push("Payment mode (Cash/UPI): ");

    return lines.join("\n");
  };

  const handleWhatsAppOrder = () => {
    const message = buildWhatsAppMessage();
    if (!message) return;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${SHOP_WHATSAPP}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="p-4 pb-20">
        {/* Header */}
{/* Header */}
<div className="flex items-center justify-between mb-4">
  <div>
    <h1 className="text-xl font-bold">Mega Store</h1>
    <a
      href={`https://www.google.com/maps?q=18.61791578397271,73.87632700266995`}
      target="_blank"
      className="text-blue-600 text-xs flex items-center gap-1 underline underline-offset-2 cursor-pointer"
    >
      📍 View on Map
    </a>
  </div>

  <button
    className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm"
    onClick={() => setCartOpen(true)}
  >
    🛒 Cart
    {cartItems.length > 0 && (
      <span className="ml-1 px-2 rounded-full bg-white text-blue-600 text-xs font-semibold">
        {cartItems.length}
      </span>
    )}
  </button>
</div>


        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or SKU (e.g. AGB-001, Harpic)"
          className="w-full p-3 border rounded-lg text-sm bg-white"
          value={search}
          onChange={handleSearch}
        />

        {/* Categories */}
        <h2 className="mt-5 mb-3 text-base font-semibold">
          Shop by Category
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isActive = cat.name === selectedCategory;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products */}
        <h2 className="mt-6 mb-3 text-base font-semibold">Products</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-500">
            No items found. Try a different search or category.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.sku}
                product={prod}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Side Cart Panel */}
      {cartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setCartOpen(false)}
          />
          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-40 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                className="text-sm text-gray-500 hover:text-black"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No items in cart. Add something from the list.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.sku}
                    className="flex items-center justify-between bg-slate-50 p-2 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {item.product.sku} • ₹{item.product.price} /{" "}
                        {item.product.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-sm"
                        onClick={() => handleUpdateQty(item.product.sku, -1)}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm"
                        onClick={() => handleUpdateQty(item.product.sku, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">₹{cartTotal}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 border border-gray-300 text-sm rounded-lg py-2"
                  onClick={handleClearCart}
                  disabled={cartItems.length === 0}
                >
                  Clear Cart
                </button>
                <button
                  className={`flex-1 text-sm rounded-lg py-2 font-semibold ${
                    cartItems.length === 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  disabled={cartItems.length === 0}
                  onClick={() => setShowCheckout(true)}

                >
                  Send on WhatsApp 📲
                </button>
              </div>

              <p className="text-[11px] text-gray-400">
                Customer will confirm address & payment in WhatsApp chat.
              </p>
            </div>
          </div>
        </>
      )}

      {showCheckout && (
  <>
    {/* Popup overlay */}
    <div
      className="fixed inset-0 bg-black/40 z-50"
      onClick={() => setShowCheckout(false)}
    />

    {/* Popup Content */}
    <div className="fixed bottom-0 left-0 right-0 bg-white z-60 p-5 rounded-t-2xl shadow-lg">
      <h2 className="text-lg font-bold mb-3">Delivery Details</h2>

      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 rounded w-full text-sm mb-2"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />

      <textarea
        placeholder="Delivery Address / Landmark"
        className="border p-2 rounded w-full text-sm mb-2"
        rows={2}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <select
        className="border p-2 rounded w-full text-sm mb-4"
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option>Cash</option>
        <option>UPI</option>
      </select>

      <button
        onClick={() => {
          setShowCheckout(false);
          handleWhatsAppOrder();
        }}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
      >
        Confirm & Send WhatsApp 📲
      </button>
    </div>
  </>
)}

    </div>
  );
}
