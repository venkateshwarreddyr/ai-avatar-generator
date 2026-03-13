import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateAvatarParams {
  prompt: string;
  stylePrompt: string;
  backgroundPrompt?: string;
  size?: "1024x1024" | "1024x1536" | "1536x1024";
  count?: number;
  userImageBase64?: string;
}

export async function generateAvatar(params: GenerateAvatarParams): Promise<string[]> {
  const { prompt, stylePrompt, backgroundPrompt, size = "1024x1024", count = 1, userImageBase64 } = params;

  const fullPrompt = buildPrompt(prompt, stylePrompt, backgroundPrompt);
  const images: string[] = [];

  const generateOne = async (): Promise<string> => {
    if (userImageBase64) {
      // Photo-to-avatar: use edit endpoint with user's image as input
      const imageBuffer = Buffer.from(userImageBase64, "base64");
      const imageFile = new File([imageBuffer], "input.png", { type: "image/png" });

      const result = await openai.images.edit({
        model: "gpt-image-1",
        image: imageFile,
        prompt: `Transform this photo into an avatar: ${fullPrompt}`,
        size: size,
      });

      return result.data?.[0]?.b64_json ?? "";
    } else {
      // Text-to-avatar: use generate endpoint
      const result = await openai.images.generate({
        model: "gpt-image-1",
        prompt: fullPrompt,
        size: size,
        n: 1,
      });

      return result.data?.[0]?.b64_json ?? "";
    }
  };

  // Generate images concurrently (max 4)
  const batchSize = Math.min(count, 4);
  const promises = Array.from({ length: batchSize }, () => generateOne());
  const results = await Promise.all(promises);
  images.push(...results.filter(Boolean));

  return images;
}

function buildPrompt(userPrompt: string, stylePrompt: string, backgroundPrompt?: string): string {
  const parts = [
    `Create a stunning avatar portrait: ${userPrompt}`,
    `Art style: ${stylePrompt}`,
    backgroundPrompt ? `Background: ${backgroundPrompt}` : null,
    "The avatar should be centered, well-composed, high quality, and visually striking.",
    "Single person portrait, facing slightly towards camera.",
  ];

  return parts.filter(Boolean).join(". ");
}
