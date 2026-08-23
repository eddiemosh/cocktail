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
    id: "pina-colada",
    name: "Piña Colada",
    description: "Tropical rum blend with coconut & pineapple",
    emoji: "🌴",
    colour: "from-yellow-200 to-amber-400",
    imageUrl: "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=400&q=80",
  },
  {
    id: "negroni",
    name: "Negroni",
    description: "Bold gin cocktail with Campari & vermouth",
    emoji: "🍊",
    colour: "from-orange-500 to-red-600",
    imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&q=80",
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    description: "Rich vodka & coffee cocktail",
    emoji: "☕",
    colour: "from-amber-800 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80",
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
      { id: "mango", label: "Mango", emoji: "🥭" },
      { id: "passionfruit", label: "Passionfruit", emoji: "🌺" },
      { id: "raspberry", label: "Raspberry", emoji: "🫐" },
      { id: "peach", label: "Peach", emoji: "🍑" },
    ],
  },
  {
    id: "syrups",
    label: "Syrups",
    type: "multi",
    options: [
      { id: "simple-syrup", label: "Simple Syrup", emoji: "🍯" },
      { id: "agave", label: "Agave Nectar", emoji: "🌵" },
      { id: "honey", label: "Honey Syrup", emoji: "🍯" },
      { id: "vanilla", label: "Vanilla Syrup", emoji: "🌼" },
      { id: "lavender", label: "Lavender Syrup", emoji: "💜" },
      { id: "ginger", label: "Ginger Syrup", emoji: "🫚" },
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
      { id: "cherry", label: "Maraschino Cherry", emoji: "🍒" },
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
