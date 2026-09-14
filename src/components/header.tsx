"use client";

import { useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#catalog", label: "Каталог" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="На главную" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="relative gap-2 rounded-full"
            onClick={open}
            aria-label={`Открыть корзину${count > 0 ? `, товаров: ${count}` : ""}`}
          >
            <ShoppingBasket className="h-4 w-4" />
            <span className="hidden sm:inline">Корзина</span>
            {count > 0 && (
              <span
                key={count}
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-in zoom-in items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground"
              >
                {count}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t transition-[max-height] duration-300 md:hidden",
          menuOpen ? "max-h-64" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container flex flex-col gap-1 py-3" aria-label="Мобильная навигация">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
