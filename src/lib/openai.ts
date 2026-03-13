import OpenAI from "openai";

// Direct image model — no org verification needed.
// Override via OPENAI_IMAGE_MODEL env var.
// Supported: gpt-image-1 (default), gpt-image-1-mini (cheaper), gpt-image-1.5 (newest)
const IMAGE_MODEL = (process.env.OPENAI_IMAGE_MODEL || "gpt-image-1") as
  | "gpt-image-1"
  | "gpt-image-1-mini"
  | "gpt-image-1.5";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your_openai_api_key_here") {
    throw new Error("Missing OPENAI_API_KEY");
  }
  return new OpenAI({ apiKey });
}

export interface GenerateAvatarParams {
  prompt: string;
  stylePrompt: string;
  backgroundPrompt?: string;
  size?: "1024x1024" | "1024x1536" | "1536x1024";
  quality?: "low" | "medium" | "high" | "auto";
  count?: number;
  userImageBase64?: string;
  userImageMediaType?: string;
}

export async function generateAvatar(params: GenerateAvatarParams): Promise<string[]> {
  const {
    prompt,
    stylePrompt,
    backgroundPrompt,
    size = "1024x1024",
    quality = "high",
    count = 1,
    userImageBase64,
    userImageMediaType = "image/png",
  } = params;

  const fullPrompt = buildPrompt(prompt, stylePrompt, backgroundPrompt);
  const openai = getOpenAIClient();

  const generateOne = async (): Promise<string> => {
    if (userImageBase64) {
      // Photo-to-avatar: use images.edit with the uploaded image
      const imageBuffer = Buffer.from(userImageBase64, "base64");
      const ext = userImageMediaType.split("/")[1] || "png";
      const imageFile = new File([imageBuffer], `input.${ext}`, { type: userImageMediaType });

      const result = await openai.images.edit({
        model: IMAGE_MODEL,
        image: imageFile,
        prompt: buildPhotoEditPrompt(prompt, stylePrompt, backgroundPrompt),
        size,
      });

      return result.data?.[0]?.b64_json ?? "";
    } else {
      // Text-to-avatar: use images.generate
      const result = await openai.images.generate({
        model: IMAGE_MODEL,
        prompt: `Draw ${fullPrompt}`,
        size,
        quality,
        n: 1,
      });

      return result.data?.[0]?.b64_json ?? "";
    }
  };

  // Generate images concurrently (max 4)
  const batchSize = Math.min(count, 4);
  const promises = Array.from({ length: batchSize }, () => generateOne());
  const results = await Promise.all(promises);

  return results.filter(Boolean);
}

function buildPrompt(userPrompt: string, stylePrompt: string, backgroundPrompt?: string): string {
  const parts = [
    `a stunning avatar portrait: ${userPrompt}`,
    `Art style: ${stylePrompt}`,
    backgroundPrompt ? `Background: ${backgroundPrompt}` : null,
    "The avatar should be centered, well-composed, high quality, and visually striking.",
    "Single person portrait, facing slightly towards camera.",
  ];

  return parts.filter(Boolean).join(". ");
}

function buildPhotoEditPrompt(
  userPrompt: string,
  stylePrompt: string,
  backgroundPrompt?: string
): string {
  const parts = [
    "Use the uploaded photo as the identity reference.",
    "Preserve the same person, facial structure, skin tone, hairline, hairstyle, moustache, age range, and overall likeness.",
    "Do not replace the person with a different face or a generic character.",
    "Create a cinematic avatar version of this same person.",
    `Character direction: ${userPrompt}`,
    `Visual style: ${stylePrompt}`,
    backgroundPrompt ? `Background: ${backgroundPrompt}` : null,
    "Keep the composition as a clean single-person portrait.",
    "Enhance the image with polished hero-style wardrobe, dramatic cinematic lighting, confident expression, and high-detail rendering.",
    "The final result should look like the uploaded person transformed into a film-hero avatar, not a random illustrated man.",
  ];

  return parts.filter(Boolean).join(" ");
}
