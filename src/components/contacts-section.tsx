import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";

const MAP_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(
  "Саваслейка, улица Инженерная"
)}`;

const CONTACTS = [
  {
    icon: MapPin,
    title: "Адрес лавки",
    lines: ["г. Саваслейка, ул. Инженерная", "лавка на первом этаже"],
  },
  {
    icon: Clock,
    title: "Часы работы",
    lines: ["Ежедневно с 08:00 до 21:00", "без перерывов и выходных"],
  },
  {
    icon: Phone,
    title: "Телефон и почта",
    lines: ["+7 967 672-..-..", "roman@mail.ru"],
  },
];

export function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t bg-secondary/40 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Контакты
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Заходите на запах дымка
          </h2>
          <p className="mt-3 text-muted-foreground">
            Попробовать можно прямо у прилавка — нарежем и угостим. Или просто
            позвоните, соберём заказ под ваш ужин.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map((contact) => (
            <div
              key={contact.title}
              className="flex items-start gap-4 rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <contact.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{contact.title}</h3>
                {contact.title === "Телефон и почта" ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      +7 967 672-..-..
                    </span>
                    <br />
                    <a
                      href="mailto:roman@mail.ru"
                      className="hover:text-foreground"
                    >
                      roman@mail.ru
                    </a>
                  </p>
                ) : contact.title === "Адрес лавки" ? (
                  <p className="mt-1 text-sm leading-relaxed">
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors hover:text-primary"
                      aria-label="Открыть адрес на карте"
                    >
                      {contact.lines[0]}
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <ExternalLink className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-primary" />
                    </a>
                    <br />
                    <span className="text-muted-foreground">
                      {contact.lines[1]}
                    </span>
                    <span className="mt-1 block text-xs text-primary">
                      Нажмите на адрес — откроется карта с маршрутом
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {contact.lines[0]}
                    <br />
                    {contact.lines[1]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
