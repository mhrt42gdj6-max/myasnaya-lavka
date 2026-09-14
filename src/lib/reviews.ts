import { promises as fs } from "fs";
import path from "path";

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-1",
    name: "Ольга",
    rating: 5,
    text: "Взяла купаты свиные и чипсы из говядины — семья в восторге. Купаты ушли на гриле за пять минут, чипсы невероятно хрустящие.",
    date: "2024-05-14T10:00:00.000Z",
  },
  {
    id: "seed-2",
    name: "Дмитрий",
    rating: 5,
    text: "Заказывал к пиву пивчики и охотничьи колбаски. Дым настоящий, не ароматизатор. Теперь беру регулярно.",
    date: "2024-06-02T18:30:00.000Z",
  },
  {
    id: "seed-3",
    name: "Марина",
    rating: 4,
    text: "Курьер привёз заказ через час, всё в термосумке, мясо холодное и свежее. Колбаса куриная — как домашняя, дети просят ещё.",
    date: "2024-07-21T12:15:00.000Z",
  },
  {
    id: "seed-4",
    name: "Алексей",
    rating: 5,
    text: "Бастурма — просто песня, тонко нарезана, вкус как у знакомого мясника из Еревана. Вяленые томаты тоже отличные, добавляю в пасту.",
    date: "2024-08-09T09:45:00.000Z",
  },
];

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "reviews.json");

async function readStored(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

export async function getAllReviews(): Promise<Review[]> {
  const stored = await readStored();
  return [...stored, ...SEED_REVIEWS];
}

export async function addReview(review: Review): Promise<void> {
  const stored = await readStored();
  stored.unshift(review);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(stored, null, 2), "utf8");
}
