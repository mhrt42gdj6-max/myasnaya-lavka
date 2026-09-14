"use server";

import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(80),
  phone: z
    .string()
    .regex(/^[\d\s+()-]{10,20}$/, "Укажите корректный телефон"),
  delivery: z.enum(["courier", "pickup"]),
  address: z.string().max(200).default(""),
  payment: z.enum(["card", "cash"]),
  comment: z.string().max(500).default(""),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        qty: z.number().int().min(1).max(99),
      })
    )
    .min(1, "Корзина пуста"),
});

export type OrderResult =
  | { ok: true; orderNumber: string }
  | { ok: false; error: string };

export async function createOrder(input: unknown): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Проверьте правильность заполнения формы" };
  }

  // Имитация обработки заказа оператором
  await new Promise((resolve) => setTimeout(resolve, 800));

  const orderNumber = `МЛ-${Math.floor(100000 + Math.random() * 900000)}`;
  return { ok: true, orderNumber };
}
