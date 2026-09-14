import { NextResponse } from "next/server";
import { z } from "zod";
import { addReview, getAllReviews } from "@/lib/reviews";

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(40),
  rating: z.number().int().min(1).max(5),
  text: z
    .string()
    .trim()
    .min(5, "Расскажите чуть подробнее")
    .max(500, "Отзыв слишком длинный"),
});

export async function GET() {
  const reviews = await getAllReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" },
      { status: 400 }
    );
  }

  const review = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    ...parsed.data,
  };
  await addReview(review);
  return NextResponse.json({ review }, { status: 201 });
}
