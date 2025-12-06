"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "../lib/types";

const STORAGE_KEY = "megaStoreCart_v1";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage once
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        setItems(parsed);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.sku === product.sku);
      if (existing) {
        return prev.map((i) =>
          i.product.sku === product.sku
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (sku: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.sku === sku
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  return {
    items,
    total,
    addItem,
    updateQuantity,
    clearCart,
  };
}
