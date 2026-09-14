import { Flame, Sprout, ThermometerSnowflake, Truck } from "lucide-react";

const FEATURES = [
  {
    icon: Sprout,
    title: "Фермерское сырьё",
    text: "Мясо от проверенных хозяйств — без антибиотиков и гормонов роста.",
  },
  {
    icon: Flame,
    title: "Собственное производство",
    text: "Коптим, вялим и готовим сами — небольшими партиями каждое утро.",
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "Привозим за 90–120 минут. Бесплатно при заказе от 2 500 ₽.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Свежесть в дороге",
    text: "Везём в термосумках-холодильниках — витринная свежесть до вашей двери.",
  },
];

export function Features() {
  return (
    <section className="border-b bg-secondary/40">
      <div className="container grid grid-cols-1 gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <feature.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
