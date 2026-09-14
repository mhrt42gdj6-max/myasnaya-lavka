import { Logo } from "@/components/logo";

const MAP_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(
  "Саваслейка, улица Инженерная"
)}`;

const NAV = [
  { href: "#catalog", label: "Каталог" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            Фермерское мясо, собственное копчение и честный состав. Готовим
            так, как готовили бы для себя.
          </p>
        </div>

        <nav aria-label="Навигация в подвале">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Разделы
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Контакты
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-amber-300 hover:underline"
              >
                г. Саваслейка, ул. Инженерная
              </a>
            </li>
            <li>Ежедневно 08:00–21:00</li>
            <li className="font-semibold text-white">+7 967 672-..-..</li>
            <li>
              <a
                href="mailto:roman@mail.ru"
                className="transition-colors hover:text-amber-300"
              >
                roman@mail.ru
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800/80">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Мясная лавка</p>
          <p>Сделано с любовью к мясу</p>
        </div>
      </div>
    </footer>
  );
}
