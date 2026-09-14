import Image from "next/image";
import { BadgeCheck } from "lucide-react";

const POINTS = [
  "Собственное производство и коптильня — без подрядчиков",
  "Фермерское мясо без антибиотиков, с документами на каждую партию",
  "Честный вес, честный состав: мясо, специи, соль — и всё",
];

const NUMBERS = [
  { value: "12 лет", label: "кормим город" },
  { value: "40+", label: "ферм-партнёров" },
  { value: "98%", label: "заказов с повтором" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y bg-secondary/40 py-16 sm:py-20">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/about.webp"
              alt="Мясной мастер за работой в лавке"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl border bg-card px-5 py-4 shadow-lg sm:left-8">
            <p className="font-serif text-2xl font-bold text-primary">с 2013</p>
            <p className="text-sm text-muted-foreground">
              года работаем на рынке
            </p>
          </div>
        </div>

        <div className="pt-4 lg:pt-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            О лавке
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Маленькая лавка с большими традициями
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            «Мясная лавка» началась с одного прилавка и домашней коптильни.
            Сегодня у нас своё производство, но принцип не изменился: готовим
            так, как готовили бы для себя. Каждое утро — свежие партии, каждый
            вечер — пустые витрины.
          </p>

          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
            {NUMBERS.map((item) => (
              <div key={item.label}>
                <dd className="font-serif text-2xl font-bold sm:text-3xl">
                  {item.value}
                </dd>
                <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
