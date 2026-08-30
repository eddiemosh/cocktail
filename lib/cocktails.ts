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
    id: "orange-juice",
    name: "Orange Juice",
    description: "Fresh citrus orange juice",
    emoji: "🍊",
    colour: "from-orange-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
  },
  {
    id: "rum-mocha",
    name: "Rum Mocha",
    description: "Rich coffee liqueur with dark rum & chocolate",
    emoji: "☕",
    colour: "from-amber-900 to-stone-900",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    description: "Classic rum, lime & sugar cocktail",
    emoji: "🍸",
    colour: "from-blue-300 to-cyan-500",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&q=80",
  },
  {
    id: "mimosa",
    name: "Mimosa",
    description: "Sparkling champagne & fresh orange juice",
    emoji: "🥂",
    colour: "from-yellow-300 to-orange-300",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
  },
  {
    id: "dark-and-stormy",
    name: "Dark & Stormy",
    description: "Spiced rum with ginger beer",
    emoji: "🌪️",
    colour: "from-gray-800 to-amber-900",
    imageUrl: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400&q=80",
  },
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    description: "Refreshing non-alcoholic mint & lime drink",
    emoji: "🌿",
    colour: "from-green-300 to-emerald-500",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80",
  },
  {
    id: "rum-punch",
    name: "Rum Punch",
    description: "Tropical blend of rum, fruit juices & spices",
    emoji: "🍹",
    colour: "from-red-400 to-orange-500",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    id: "bloody-mary",
    name: "Bloody Mary",
    description: "Vodka with tomato juice & spicy seasonings",
    emoji: "🍅",
    colour: "from-red-600 to-red-800",
    imageUrl: "https://images.unsplash.com/photo-1608897657900-8ba6a0fd6fb0?w=400&q=80",
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
  {
    id: "spice",
    label: "Spice Level",
    type: "single",
    options: [
      { id: "no-spice", label: "Not Spiced", emoji: "😊" },
      { id: "spiced", label: "Spiced", emoji: "🌶️" },
    ],
  },
];
