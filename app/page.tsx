// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import HeaderBar from "@/app/components/layout/HeaderBar";
import SearchBar from "@/app/components/shop/SearchBar";
import CategoryFilter from "@/app/components/shop/CategoryFilter";
import ProductCard from "@/app/components/shop/ProductCard";
import CartDrawer from "@/app/components/cart/CartDrawer";
import CheckoutDialog from "@/app/components/cart/CheckoutDialog";
import { useCart } from "@/app/hooks/useCart";
import { filterProducts } from "@/app/lib/search";
import type { Category, Product } from "@/app/lib/types";
import { SHOP_WHATSAPP } from "@/app/lib/config";

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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
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

  // Load products from API (mock now, DB later)
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    };
    load();
  }, []);

  const filtered = useMemo(
    () => filterProducts(products, search, selectedCategory),
    [products, search, selectedCategory]
  );

  const buildWhatsAppMessage = () => {
    if (!items.length) return "";

    const lines: string[] = [];

    lines.push("Namaste! 🙏 I want to place an order:");
    lines.push("");

    items.forEach((item) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `${item.product.sku} - ${item.product.name} x ${
          item.quantity
        } = ₹${lineTotal}`
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
              No items found. Try a different search or category.
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
