export type CategoryId =
  | "chips"
  | "sausages"
  | "kupaty"
  | "delicacies"
  | "snacks";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  weight: string;
  price: number;
  image: string;
  badge?: "Хит" | "Новинка" | "Остро";
};

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "chips", label: "Мясные чипсы" },
  { id: "sausages", label: "Колбаски" },
  { id: "kupaty", label: "Купаты" },
  { id: "delicacies", label: "Деликатесы" },
  { id: "snacks", label: "Закуски" },
];

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  chips: "Мясные чипсы",
  sausages: "Колбаски",
  kupaty: "Купаты",
  delicacies: "Деликатесы",
  snacks: "Закуски",
};

export const PRODUCTS: Product[] = [
  {
    id: "chips-chicken",
    name: "Чипсы мясные из курицы",
    description:
      "Хрустящие ломтики куриного филе лёгкого посола. Идеальны к пиву и вместо привычных снеков.",
    category: "chips",
    weight: "50 г",
    price: 149,
    image: "/products/chips-chicken.webp",
    badge: "Хит",
  },
  {
    id: "chips-pork",
    name: "Чипсы свиные копчёные",
    description:
      "Тонкие чипсы из свинины горячего копчения на ольхе — с насыщенным дымным ароматом.",
    category: "chips",
    weight: "50 г",
    price: 179,
    image: "/products/chips-pork.webp",
  },
  {
    id: "chips-beef",
    name: "Чипсы из говядины «Пикантные»",
    description:
      "Вяленые чипсы из говяжьей вырезки с паприкой и чили. Пряные, с долгим послевкусием.",
    category: "chips",
    weight: "50 г",
    price: 189,
    image: "/products/chips-beef.webp",
    badge: "Остро",
  },
  {
    id: "chips-lamb",
    name: "Чипсы из баранины с травами",
    description:
      "Нежная баранина, розмарин и зира. Готовим малыми партиями по семейному рецепту.",
    category: "chips",
    weight: "50 г",
    price: 209,
    image: "/products/chips-lamb.webp",
  },
  {
    id: "chips-pork-garlic",
    name: "Чипсы свиные с чесноком",
    description:
      "Хрустящие ломтики свинины с чесноком и чёрным перцем. Обжарка и сушка по домашнему рецепту.",
    category: "chips",
    weight: "50 г",
    price: 189,
    image: "/products/chips-pork-garlic.webp",
    badge: "Новинка",
  },
  {
    id: "chips-bbq",
    name: "Чипсы куриные BBQ",
    description:
      "Куриные чипсы в глазури из томатов и мёда с дымком барбекю и кунжутом.",
    category: "chips",
    weight: "50 г",
    price: 159,
    image: "/products/chips-bbq.webp",
    badge: "Новинка",
  },
  {
    id: "chips-turkey",
    name: "Чипсы из индейки с паприкой",
    description:
      "Лёгкие ломтики филе индейки, сушёные с паприкой и душистыми травами.",
    category: "chips",
    weight: "50 г",
    price: 169,
    image: "/products/chips-turkey.webp",
  },
  {
    id: "kolbaski-chicken-teriyaki",
    name: "Колбаски куриные «Терияки»",
    description:
      "Тонкие куриные колбаски в соусе терияки с кунжутом — готовы за 5 минут на сковороде.",
    category: "sausages",
    weight: "400 г",
    price: 319,
    image: "/products/kolbaski-chicken-teriyaki.webp",
  },
  {
    id: "kolbaski-pork-hunting",
    name: "Колбаски свиные «Охотничьи»",
    description:
      "Классика коптильни: плотные свиные колбаски с чесноком и чёрным перцем.",
    category: "sausages",
    weight: "400 г",
    price: 349,
    image: "/products/kolbaski-pork-hunting.webp",
    badge: "Хит",
  },
  {
    id: "kolbaski-beef",
    name: "Колбаски говяжьи «Пикантные»",
    description:
      "Говяжьи колбаски с кориандром и мускатным орехом. Обжариваются до хрустящей корочки.",
    category: "sausages",
    weight: "400 г",
    price: 379,
    image: "/products/kolbaski-beef.webp",
  },
  {
    id: "kolbasa-chicken-domestic",
    name: "Колбаса куриная домашняя",
    description:
      "Готовим из цельного куриного филе с чесноком и зеленью. Для бутербродов и детской тарелки.",
    category: "sausages",
    weight: "400 г",
    price: 299,
    image: "/products/kolbasa-chicken-domestic.webp",
    badge: "Новинка",
  },
  {
    id: "kupaty-pork",
    name: "Купаты свиные классические",
    description:
      "Свиные купаты с луком и специями в натуральной оболочке. На гриле — просто объедение.",
    category: "kupaty",
    weight: "500 г",
    price: 389,
    image: "/products/kupaty-pork.webp",
    badge: "Хит",
  },
  {
    id: "kupaty-chicken-cheese",
    name: "Купаты куриные с сыром",
    description:
      "Куриный фарш и сулугуни внутри — тают на гриле. Любимый выбор детей.",
    category: "kupaty",
    weight: "500 г",
    price: 359,
    image: "/products/kupaty-chicken-cheese.webp",
  },
  {
    id: "kupaty-beef-georgian",
    name: "Купаты говяжьи по-грузински",
    description:
      "Говядина с кинзой, барбарисом и грузинскими специями. Рецепт от шеф-повара.",
    category: "kupaty",
    weight: "500 г",
    price: 429,
    image: "/products/kupaty-beef-georgian.webp",
  },
  {
    id: "kupaty-lamb-spicy",
    name: "Купаты бараньи острые",
    description:
      "Баранина с чили и зирой. Для смелых — жарим до угольков на мангале.",
    category: "kupaty",
    weight: "500 г",
    price: 459,
    image: "/products/kupaty-lamb-spicy.webp",
    badge: "Остро",
  },
  {
    id: "pastila-apple",
    name: "Пастила яблочная",
    description:
      "Нежная пастила из печёных яблок с клюквой — без сахара. К чаю и в дорогу.",
    category: "snacks",
    weight: "100 г",
    price: 129,
    image: "/products/pastila-apple.webp",
  },
  {
    id: "tomatoes-dried",
    name: "Вяленые томаты в масле",
    description:
      "Спелые томаты с чесноком и прованскими травами в оливковом масле. Для салатов, брускетт и пасты.",
    category: "snacks",
    weight: "180 г",
    price: 249,
    image: "/products/tomatoes-dried.webp",
  },
  {
    id: "pivchiki-smoked",
    name: "Пивчики свиные копчёные",
    description:
      "Мини-колбаски горячего копчения — плотные, дымные, исчезают первыми.",
    category: "snacks",
    weight: "200 г",
    price: 219,
    image: "/products/pivchiki-smoked.webp",
    badge: "Хит",
  },
  {
    id: "basturma",
    name: "Бастурма говяжья",
    description:
      "Выдержанная говяжья вырезка в обсыпке из чамана. Нарезана тонко, как в Ереване.",
    category: "delicacies",
    weight: "200 г",
    price: 549,
    image: "/products/basturma.webp",
  },
  {
    id: "sudzhuk",
    name: "Суджук острая",
    description:
      "Сухая вяленая колбаса из говядины с перцем. Созревает 30 дней в сушильной камере.",
    category: "delicacies",
    weight: "300 г",
    price: 519,
    image: "/products/sudzhuk.webp",
  },
];

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}
