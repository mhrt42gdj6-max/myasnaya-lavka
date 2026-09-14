"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

const STORAGE_KEY = "dym-ogon-cart-v1";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  items: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  productById: (id: string) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (line) =>
                typeof line?.id === "string" &&
                typeof line?.qty === "number" &&
                line.qty > 0
            )
          );
        }
      }
    } catch {
      // повреждённое хранилище — начинаем с пустой корзины
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // нет доступа к localStorage — просто работаем без сохранения
    }
  }, [items, mounted]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id
            ? { ...line, qty: Math.min(99, line.qty + qty) }
            : line
        );
      }
      return [...prev, { id, qty: Math.min(99, qty) }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((line) => line.id !== id);
      return prev.map((line) =>
        line.id === id ? { ...line, qty: Math.min(99, qty) } : line
      );
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const productById = useCallback(
    (id: string) => PRODUCTS.find((product) => product.id === id),
    []
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.qty, 0);
    const total = items.reduce((sum, line) => {
      const product = PRODUCTS.find((p) => p.id === line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
    return {
      items,
      count,
      total,
      isOpen,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
      productById,
    };
  }, [items, isOpen, open, close, add, setQty, remove, clear, productById]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
