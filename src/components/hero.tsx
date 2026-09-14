import Image from "next/image";
import { ArrowDown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "20", label: "позиций в лавке" },
  { value: "100%", label: "фермерское мясо" },
  { value: "90 мин", label: "доставка по городу" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-stone-950">
      <Image
        src="/hero.webp"
        alt="Ассорти из колбасок, купат и мясных чипсов на деревянном столе"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/65 to-stone-950/20" />

      <div className="container relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-sm font-medium text-amber-200">
            <Flame className="h-4 w-4" />
            Свежее копчение каждое утро
          </p>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
            Настоящее мясо —&nbsp;как с деревенского костра
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-300">
            Мясные чипсы, колбаски, купаты и закуски из фермерских продуктов.
            Готовим в собственной лавке — без консервантов и лишних слов в
            составе.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full text-base" asChild>
              <a href="#catalog">
                Выбрать мясо
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-stone-600 bg-transparent text-base text-stone-100 hover:bg-stone-800 hover:text-stone-50"
              asChild
            >
              <a href="#about">Как мы работаем</a>
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-3xl font-bold text-amber-300">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-sm text-stone-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
