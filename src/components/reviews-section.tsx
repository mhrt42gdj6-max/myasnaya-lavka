"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageSquarePlus, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Stars({
  value,
  size = "h-4 w-4",
}: {
  value: number;
  size?: string;
}) {
  return (
    <span
      className="flex gap-0.5"
      role="img"
      aria-label={`Оценка: ${value} из 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size,
            star <= value
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data: { reviews: Review[] }) => {
        if (!cancelled) setReviews(data.reviews);
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function submitReview(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, text }),
      });
      const data: { review?: Review; error?: string } = await res.json();
      if (!res.ok || !data.review) {
        toast.error(data.error ?? "Не удалось отправить отзыв");
        return;
      }
      setReviews((prev) => [data.review as Review, ...(prev ?? [])]);
      setName("");
      setRating(5);
      setText("");
      toast.success("Спасибо за отзыв!");
    } catch {
      toast.error("Не удалось отправить отзыв. Попробуйте ещё раз");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="scroll-mt-20 border-t py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Отзывы
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Что говорят гости лавки
          </h2>
          <p className="mt-3 text-muted-foreground">
            Купали у нас? Оставьте отзыв — это помогает лавке расти, а другим
            покупателям — выбирать.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={submitReview}
            className="h-fit space-y-4 rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl font-bold">Оставить отзыв</h3>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="review-name">Ваше имя</Label>
              <Input
                id="review-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Иван"
                maxLength={40}
                required
                minLength={2}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Оценка</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Поставить ${star} из 5`}
                    className="rounded p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted-foreground/30"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="review-text">Отзыв</Label>
              <Textarea
                id="review-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Что понравилось, что взяли, как впечатления"
                className="min-h-24"
                maxLength={500}
                required
                minLength={5}
              />
              <p className="text-right text-xs text-muted-foreground">
                {text.length}/500
              </p>
            </div>

            <Button type="submit" className="w-full rounded-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправляем…
                </>
              ) : (
                "Отправить отзыв"
              )}
            </Button>
          </form>

          <div>
            {reviews === null ? (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-muted-foreground">
                Отзывов пока нет — станьте первым!
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{review.name}</span>
                      <Stars value={review.rating} />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.text}
                    </p>
                    <p className="mt-auto text-xs text-muted-foreground/70">
                      {formatDate(review.date)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
