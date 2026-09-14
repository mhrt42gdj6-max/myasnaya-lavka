"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  PRODUCTS,
  formatPrice,
  type CategoryId,
  type Product,
} from "@/lib/products";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<NonNullable<Product["badge"]>, string> = {
  Хит: "bg-primary text-primary-foreground",
  Новинка: "bg-amber-400 text-stone-900",
  Остро: "bg-red-700 text-white",
};

function AddControl({ product }: { product: Product }) {
  const { items, add, setQty, open } = useCart();
  const qty = items.find((line) => line.id === product.id)?.qty ?? 0;

  if (qty === 0) {
    return (
      <Button
        size="sm"
        className="rounded-full"
        onClick={() => {
          add(product.id);
          toast(`«${product.name}» — в корзине`, {
            description: formatPrice(product.price),
            action: { label: "Открыть", onClick: open },
          });
        }}
        aria-label={`Добавить «${product.name}» в корзину`}
      >
        <Plus className="h-4 w-4" />
        В корзину
      </Button>
    );
  }

  return (
    <div className="flex h-9 items-center gap-1 rounded-full border border-input bg-background pl-1 pr-1">
      <button
        type="button"
        onClick={() => setQty(product.id, qty - 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Убавить количество"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-bold" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(product.id)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        aria-label="Прибавить количество"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
          {CATEGORY_LABELS[product.category]}
        </span>
        {product.badge && (
          <span
            className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold",
              BADGE_STYLES[product.badge]
            )}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg font-bold leading-snug">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-lg font-bold leading-none text-primary">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              фасовка {product.weight}
            </p>
          </div>
          <AddControl product={product} />
        </div>
      </div>
    </article>
  );
}

export function ProductsSection() {
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === category),
    [category]
  );

  return (
    <section id="catalog" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Каталог
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Чипсы, колбаски, купаты и закуски
          </h2>
          <p className="mt-3 text-muted-foreground">
            Двадцать позиций: семь видов чипсов, колбаски и домашняя колбаса,
            купаты, вяленые деликатесы и закуски к столу. Всё — свежего
            производства.
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Категории продуктов"
        >
          {CATEGORIES.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(item.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
