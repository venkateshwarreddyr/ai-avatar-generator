export const AVATAR_STYLES = [
  {
    id: "realistic",
    name: "Realistic",
    emoji: "📸",
    description: "Photo-realistic portrait style",
    prompt: "hyper-realistic portrait photograph, professional studio lighting, sharp focus, high detail skin texture",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    emoji: "🎨",
    description: "Fun cartoon illustration",
    prompt: "colorful cartoon illustration style, bold outlines, vibrant colors, playful expression, Disney-inspired",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "anime",
    name: "Anime",
    emoji: "⛩️",
    description: "Japanese anime art style",
    prompt: "anime art style, large expressive eyes, clean linework, cel-shaded, Studio Ghibli inspired, beautiful lighting",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    emoji: "🤖",
    description: "Futuristic neon aesthetic",
    prompt: "cyberpunk style, neon lighting, futuristic augmentations, rain-soaked city reflections, holographic elements, high-tech low-life aesthetic",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    emoji: "🧙",
    description: "Epic fantasy portrait",
    prompt: "epic fantasy art style, magical aura, ethereal lighting, detailed armor or robes, enchanted background, Lord of the Rings inspired",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "pixar",
    name: "Pixar 3D",
    emoji: "🎬",
    description: "Pixar-style 3D character",
    prompt: "Pixar 3D animation style, smooth subsurface scattering skin, big expressive eyes, charming character design, cinematic lighting",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "watercolor",
    name: "Watercolor",
    emoji: "🖌️",
    description: "Soft watercolor painting",
    prompt: "watercolor painting style, soft washes of color, delicate brush strokes, flowing paint effects, artistic portrait, paper texture",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    id: "pop-art",
    name: "Pop Art",
    emoji: "💥",
    description: "Bold pop art style",
    prompt: "pop art style, bold primary colors, Ben-Day dots, thick black outlines, Andy Warhol inspired, comic book aesthetic",
    gradient: "from-red-500 to-pink-600",
  },
] as const;

export type AvatarStyleId = (typeof AVATAR_STYLES)[number]["id"];

export const BACKGROUNDS = [
  { id: "studio", name: "Studio", prompt: "clean studio background with soft gradient lighting" },
  { id: "office", name: "Modern Office", prompt: "modern tech office background with glass walls and plants" },
  { id: "nature", name: "Nature", prompt: "beautiful natural landscape background with soft bokeh" },
  { id: "space", name: "Space", prompt: "cosmic space background with stars and nebulae" },
  { id: "city", name: "Cityscape", prompt: "urban cityscape background at golden hour" },
  { id: "abstract", name: "Abstract", prompt: "abstract colorful geometric background" },
] as const;

export const PROFESSIONS = [
  "Software Engineer",
  "Designer",
  "Doctor",
  "Entrepreneur",
  "Artist",
  "Musician",
  "Scientist",
  "Teacher",
  "Writer",
  "Gamer",
] as const;

export const IMAGE_SIZES = ["1024x1024", "1024x1536", "1536x1024"] as const;
export type ImageSize = (typeof IMAGE_SIZES)[number];

export const PRESET_PROMPTS = [
  {
    title: "Tech CEO",
    prompt: "confident tech startup CEO, wearing smart casual, warm smile",
    style: "realistic" as AvatarStyleId,
    background: "office",
  },
  {
    title: "Anime Hero",
    prompt: "powerful anime protagonist, determined expression, wind flowing through hair",
    style: "anime" as AvatarStyleId,
    background: "abstract",
  },
  {
    title: "Cyberpunk Hacker",
    prompt: "elite hacker with cybernetic implants, hoodie, holographic screens floating around",
    style: "cyberpunk" as AvatarStyleId,
    background: "city",
  },
  {
    title: "Fantasy Wizard",
    prompt: "wise wizard with flowing robes, glowing staff, ancient runes floating in the air",
    style: "fantasy" as AvatarStyleId,
    background: "nature",
  },
  {
    title: "Pixar Character",
    prompt: "cheerful and friendly character, big smile, colorful outfit",
    style: "pixar" as AvatarStyleId,
    background: "studio",
  },
  {
    title: "Pop Art Icon",
    prompt: "stylish person with sunglasses, confident pose, trendsetter vibes",
    style: "pop-art" as AvatarStyleId,
    background: "abstract",
  },
];
