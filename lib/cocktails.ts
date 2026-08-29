export interface BaseCocktail {
  id: string;
  name: string;
  description: string;
  emoji: string;
  colour: string;
  imageUrl: string;
}

export interface CustomisationGroup {
  id: string;
  label: string;
  type: "multi" | "single";
  options: { id: string; label: string; emoji?: string }[];
}

export const BASE_COCKTAILS: BaseCocktail[] = [
  {
    id: "mojito",
    name: "Mojito",
    description: "Refreshing rum classic with lime & mint",
    emoji: "🍹",
    colour: "from-green-400 to-emerald-600",
    imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    description: "Elegant vodka cocktail with cranberry",
    emoji: "🍸",
    colour: "from-pink-400 to-rose-600",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
  },
  {
    id: "margarita",
    name: "Margarita",
    description: "Zesty tequila favourite with salt rim",
    emoji: "🍋",
    colour: "from-yellow-400 to-lime-500",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80",
  },
  {
    id: "limoncello-spritz",
    name: "Limoncello Spritz",
    description: "Lemony Italian liqueur with sparkling citrus and berries",
    emoji: "🍋",
    colour: "from-yellow-300 to-orange-400",
    imageUrl: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=400&q=80",
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    description: "Rich vodka & coffee cocktail",
    emoji: "☕",
    colour: "from-amber-800 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80",
  },
  {
    id: "coke",
    name: "Coke",
    description: "Classic cola soft drink",
    emoji: "🥤",
    colour: "from-amber-900 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860144a7?w=400&q=80",
  },
  {
    id: "lemonade",
    name: "Lemonade",
    description: "Refreshing freshly squeezed lemonade",
    emoji: "🍋",
    colour: "from-yellow-300 to-yellow-500",
    imageUrl: "https://images.unsplash.com/photo-1523677011781-6a8e6b7b5b5f?w=400&q=80",
  },
  {
    id: "apple-juice",
    name: "Apple Juice",
    description: "Fresh crisp apple juice",
    emoji: "🍎",
    colour: "from-red-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&q=80",
  },
  {
    id: "orange-juice",
    name: "Orange Juice",
    description: "Fresh citrus orange juice",
    emoji: "🍊",
    colour: "from-orange-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
  },
  {
    id: "water",
    name: "Water",
    description: "Pure refreshing water",
    emoji: "💧",
    colour: "from-blue-300 to-cyan-500",
    imageUrl: "https://images.unsplash.com/photo-1602527336146-fef29ecc73d7?w=400&q=80",
  },
];

export const CUSTOMISATION_GROUPS: CustomisationGroup[] = [
  {
    id: "flavours",
    label: "Flavours",
    type: "multi",
    options: [
      { id: "mint", label: "Mint", emoji: "🌿" },
      { id: "lime", label: "Lime", emoji: "🍋" },
      { id: "lemon", label: "Lemon", emoji: "🍋‍🟩" },
      { id: "strawberry", label: "Strawberry", emoji: "🍓" },
      { id: "orange", label: "Orange", emoji: "🍊" },
      { id: "raspberry", label: "Raspberry", emoji: "🫐" },
      { id: "simple-syrup", label: "Simple Syrup", emoji: "🍯" },
      { id: "vanilla", label: "Vanilla Syrup", emoji: "🌼" },
      { id: "toffee", label: "Toffee", emoji: "🍮" },
    ],
  },
  {
    id: "garnish",
    label: "Garnish",
    type: "multi",
    options: [
      { id: "lime-wedge", label: "Lime Wedge", emoji: "🍋" },
      { id: "lemon-twist", label: "Lemon Twist", emoji: "🍋" },
      { id: "mint-sprig", label: "Mint Sprig", emoji: "🌿" },
      { id: "orange-slice", label: "Orange Slice", emoji: "🍊" },
      { id: "salt-rim", label: "Salt Rim", emoji: "🧂" },
      { id: "sugar-rim", label: "Sugar Rim", emoji: "✨" },
      { id: "umbrella", label: "Cocktail Umbrella", emoji: "☂️" },
    ],
  },
  {
    id: "grenadine",
    label: "Grenadine Colouring",
    type: "single",
    options: [
      { id: "no-grenadine", label: "No Grenadine", emoji: "❌" },
      { id: "splash-grenadine", label: "Splash of Grenadine", emoji: "🩷" },
      { id: "grenadine-layered", label: "Layered Grenadine", emoji: "❤️" },
    ],
  },
  {
    id: "ice",
    label: "Ice",
    type: "single",
    options: [
      { id: "no-ice", label: "No Ice", emoji: "🚫" },
      { id: "light-ice", label: "Light Ice", emoji: "🧊" },
      { id: "regular-ice", label: "Regular Ice", emoji: "🧊🧊" },
      { id: "extra-ice", label: "Extra Ice", emoji: "🧊🧊🧊" },
    ],
  },
];
