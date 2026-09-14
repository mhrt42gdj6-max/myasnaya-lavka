"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/components/cart-provider";
import { createOrder } from "@/app/actions";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

const MIN_ORDER = 700;
const DELIVERY_FEE = 299;
const FREE_FROM = 2500;

const checkoutSchema = z
  .object({
    name: z.string().min(2, "Укажите имя").max(80),
    phone: z
      .string()
      .regex(/^[\d\s+()-]{10,20}$/, "Формат: +7 (999) 123-45-67"),
    delivery: z.enum(["courier", "pickup"]),
    address: z.string().max(200),
    payment: z.enum(["card", "cash"]),
    comment: z.string().max(500),
  })
  .refine((data) => data.delivery !== "courier" || data.address.trim().length >= 5, {
    message: "Укажите адрес доставки",
    path: ["address"],
  });

type FormValues = z.infer<typeof checkoutSchema>;
type View = "cart" | "checkout" | "success";

function OptionPills({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
            value === option.value
              ? "border-primary bg-primary/10 text-foreground"
              : "border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {option.label}
          {option.hint && (
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
              {option.hint}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function CartDialog() {
  const { isOpen, close, items, count, total, productById, setQty, remove, clear } =
    useCart();

  const [view, setView] = useState<View>("cart");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      delivery: "courier",
      address: "",
      payment: "card",
      comment: "",
    },
  });

  const deliveryMethod = form.watch("delivery");

  const deliveryCost =
    deliveryMethod === "pickup" || total >= FREE_FROM ? 0 : DELIVERY_FEE;
  const grandTotal = total + deliveryCost;
  const canCheckout = total >= MIN_ORDER;

  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setView("cart");
      setServerError(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  async function onSubmit(values: FormValues) {
    setServerError(null);
    setSubmitting(true);
    const result = await createOrder({
      ...values,
      items: items.map((line) => ({ id: line.id, qty: line.qty })),
    });
    setSubmitting(false);

    if (result.ok) {
      setOrderNumber(result.orderNumber);
      setView("success");
      clear();
      form.reset();
    } else {
      setServerError(result.error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-lg">
        {view === "cart" && (
          <>
            <DialogHeader className="border-b px-6 py-5">
              <DialogTitle className="flex items-center gap-2 font-serif text-2xl font-bold">
                <ShoppingBasket className="h-5 w-5 text-primary" />
                Корзина
              </DialogTitle>
              <DialogDescription>
                {count > 0
                  ? `${count} ${count === 1 ? "позиция" : count < 5 ? "позиции" : "позиций"} · товары: ${formatPrice(total)}`
                  : "Пока пусто — самое время это исправить"}
              </DialogDescription>
            </DialogHeader>

            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <ShoppingBasket className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Добавьте чипсы, колбаски или купаты из каталога — и они
                  появятся здесь.
                </p>
                <Button className="rounded-full" asChild onClick={close}>
                  <a href="#catalog">Перейти в каталог</a>
                </Button>
              </div>
            ) : (
              <>
                <ul className="divide-y px-6">
                  {items.map((line) => {
                    const product = productById(line.id);
                    if (!product) return null;
                    return (
                      <li key={line.id} className="flex gap-4 py-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatPrice(product.price)} · {product.weight}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex h-8 items-center gap-1 rounded-full border border-input px-1">
                              <button
                                type="button"
                                onClick={() => setQty(line.id, line.qty - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                                aria-label="Убавить количество"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(line.id, line.qty + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                                aria-label="Прибавить количество"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold">
                                {formatPrice(product.price * line.qty)}
                              </span>
                              <button
                                type="button"
                                onClick={() => remove(line.id)}
                                className="text-muted-foreground transition-colors hover:text-destructive"
                                aria-label={`Убрать «${product.name}» из корзины`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t px-6 py-5">
                  {!canCheckout && (
                    <p className="mb-3 rounded-lg bg-amber-100 px-3 py-2 text-xs text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
                      Минимальная сумма заказа — {formatPrice(MIN_ORDER)}. Добавьте
                      ещё на {formatPrice(MIN_ORDER - total)}.
                    </p>
                  )}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товары</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка</span>
                      <span>
                        {total >= FREE_FROM
                          ? "бесплатно"
                          : `${formatPrice(DELIVERY_FEE)} · бесплатно от ${formatPrice(FREE_FROM)}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-bold">
                      <span>Итого</span>
                      <span>{formatPrice(total + DELIVERY_FEE)}</span>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="mt-4 w-full rounded-full"
                    disabled={!canCheckout}
                    onClick={() => setView("checkout")}
                  >
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {view === "checkout" && (
          <>
            <DialogHeader className="border-b px-6 py-5">
              <button
                type="button"
                onClick={() => setView("cart")}
                className="mb-1 inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Вернуться в корзину
              </button>
              <DialogTitle className="font-serif text-2xl font-bold">
                Оформление заказа
              </DialogTitle>
              <DialogDescription>
                Перезвоним в течение 10 минут, чтобы подтвердить заказ.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Ваше имя</Label>
                <Input id="name" placeholder="Иван" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Как получить</Label>
                <OptionPills
                  value={deliveryMethod}
                  onChange={(value) =>
                    form.setValue("delivery", value as FormValues["delivery"])
                  }
                  options={[
                    { value: "courier", label: "Курьером", hint: "90–120 минут" },
                    { value: "pickup", label: "Самовывоз", hint: "через 30 минут" },
                  ]}
                />
              </div>

              {deliveryMethod === "courier" && (
                <div className="space-y-1.5">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Input
                    id="address"
                    placeholder="Улица, дом, квартира"
                    {...form.register("address")}
                  />
                  {form.formState.errors.address && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Оплата</Label>
                <OptionPills
                  value={form.watch("payment")}
                  onChange={(value) =>
                    form.setValue("payment", value as FormValues["payment"])
                  }
                  options={[
                    { value: "card", label: "Картой онлайн" },
                    { value: "cash", label: "При получении" },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  placeholder="Например: порезать купаты, позвонить заранее"
                  className="min-h-20"
                  {...form.register("comment")}
                />
              </div>

              <div className="rounded-xl bg-muted/60 p-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Товары ({count} {count === 1 ? "позиция" : count < 5 ? "позиции" : "позиций"})
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="mt-1 flex justify-between text-muted-foreground">
                  <span>{deliveryMethod === "pickup" ? "Самовывоз" : "Доставка курьером"}</span>
                  <span>{deliveryCost === 0 ? "бесплатно" : formatPrice(deliveryCost)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t pt-2 text-base font-bold">
                  <span>Итого</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {serverError && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={submitting}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Отправляем…" : `Подтвердить заказ · ${formatPrice(grandTotal)}`}
              </Button>
            </form>
          </>
        )}

        {view === "success" && (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold">
              Заказ {orderNumber} принят!
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Мы уже собираем вашу корзину. Менеджер перезвонит в течение 10
              минут, чтобы подтвердить состав и время доставки.
            </p>
            <Button className="mt-6 w-full rounded-full" onClick={close}>
              Отлично, жду звонка
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
