import {
  ClipboardList,
  ShoppingBasket,
  Truck,
  Wallet,
  Clock,
  ThermometerSnowflake,
} from "lucide-react";

const STEPS = [
  {
    icon: ShoppingBasket,
    step: "Шаг 1",
    title: "Выберите продукты",
    text: "Добавьте чипсы, колбаски и купаты в корзину — прямо из каталога.",
  },
  {
    icon: ClipboardList,
    step: "Шаг 2",
    title: "Оформите заказ",
    text: "Укажите имя, телефон и адрес. Перезвоним за 10 минут для подтверждения.",
  },
  {
    icon: Truck,
    step: "Шаг 3",
    title: "Получите заказ",
    text: "Курьер привезёт за 90–120 минут. Или заберите самовывозом за полчаса.",
  },
];

const FACTS = [
  { icon: Wallet, label: "Бесплатно от 2 500 ₽" },
  { icon: Clock, label: "90–120 минут по городу" },
  { icon: ThermometerSnowflake, label: "Термосумки с охлаждением" },
  { icon: Truck, label: "Самовывоз за 30 минут" },
];

export function DeliverySection() {
  return (
    <section id="delivery" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Доставка и оплата
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            От прилавка до вашей двери — за полтора часа
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {item.step}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-primary px-6 py-5 text-primary-foreground">
          <p className="font-serif text-lg font-bold">
            Доставка по городу — 299 ₽, бесплатно от 2 500 ₽
          </p>
          <div className="ml-auto flex flex-wrap gap-2">
            {FACTS.map((fact) => (
              <span
                key={fact.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-medium"
              >
                <fact.icon className="h-3.5 w-3.5" />
                {fact.label}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Оплата — картой онлайн или наличными курьеру. Минимальная сумма
          заказа — 700 ₽.
        </p>
      </div>
    </section>
  );
}
