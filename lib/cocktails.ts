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
    imageUrl: "https://images.unsplash.com/photo-1609318325191-aeb0b8c92db4?w=400&q=80",
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
    id: "rum-punch",
    name: "Rum Punch",
    description: "Tropical blend of rum, fruit juices & spices",
    emoji: "🍹",
    colour: "from-red-400 to-orange-500",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    id: "manhattan",
    name: "Manhattan",
    description: "Smooth whiskey cocktail with vermouth & grenadine",
    emoji: "🥃",
    colour: "from-amber-800 to-orange-900",
    imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&q=80",
  },
  {
    id: "martini",
    name: "Martini",
    description: "Classic gin & dry vermouth cocktail",
    emoji: "🍸",
    colour: "from-blue-100 to-blue-300",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=400&q=80",
  },
  {
    id: "gimlet",
    name: "Gimlet",
    description: "Crisp gin & lime juice classic",
    emoji: "🍋",
    colour: "from-green-300 to-green-500",
    imageUrl: "https://images.unsplash.com/photo-1618183479302-1461ae109398?w=400&q=80",
  },
  {
    id: "whiskey-sour",
    name: "Whiskey Sour",
    description: "Smooth whiskey with tart lemon",
    emoji: "🥃",
    colour: "from-orange-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1608897657900-8ba6a0fd6fb0?w=400&q=80",
  },
  {
    id: "caramel-chocolate-rum",
    name: "Caramel Chocolate Rum",
    description: "Decadent blend of caramel rum & chocolate with coffee",
    emoji: "🍫",
    colour: "from-amber-900 to-stone-800",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  },
];

export const BASE_MOCKTAILS: BaseCocktail[] = [
  {
    id: "orange-juice",
    name: "Orange Juice",
    description: "Fresh citrus orange juice",
    emoji: "🍊",
    colour: "from-orange-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
  },
  {
    id: "virgin-daiquiri",
    name: "Virgin Daiquiri",
    description: "Non-alcoholic lime & sugar mocktail",
    emoji: "🌿",
    colour: "from-lime-300 to-green-400",
    imageUrl: "https://images.unsplash.com/photo-1609318325191-aeb0b8c92db4?w=400&q=80",
  },
  {
    id: "mint-limeade",
    name: "Mint Limeade",
    description: "Refreshing mint & lime non-alcoholic drink",
    emoji: "🌿",
    colour: "from-green-300 to-emerald-500",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80",
  },
  {
    id: "strawberry-punch",
    name: "Strawberry Punch",
    description: "Sweet strawberry & lemon mocktail",
    emoji: "🍓",
    colour: "from-pink-300 to-red-400",
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba2a8e36cd12?w=400&q=80",
  },
  {
    id: "orange-vanilla-refresher",
    name: "Orange & Vanilla Refresher",
    description: "Citrus-forward mocktail with vanilla smoothness",
    emoji: "🍊",
    colour: "from-orange-300 to-yellow-400",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80",
  },
];

// Combined array for backwards compatibility
export const ALL_DRINKS = [...BASE_COCKTAILS, ...BASE_MOCKTAILS];

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
