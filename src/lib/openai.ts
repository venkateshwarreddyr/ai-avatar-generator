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

  const openai = getOpenAIClient();

  const generateOne = async (): Promise<string> => {
    if (userImageBase64) {
      // Photo-to-avatar: use images.edit with the uploaded image
      const imageBuffer = Buffer.from(userImageBase64, "base64");
      const ext = userImageMediaType.split("/")[1] || "png";
      const imageFile = new File([imageBuffer], `input.${ext}`, { type: userImageMediaType });

      const editPrompt = buildPhotoEditPrompt(prompt, stylePrompt, backgroundPrompt);

      const result = await openai.images.edit({
        model: IMAGE_MODEL,
        image: imageFile,
        prompt: editPrompt,
        size,
      });

      return result.data?.[0]?.b64_json ?? "";
    } else {
      // Text-to-avatar: use images.generate
      const result = await openai.images.generate({
        model: IMAGE_MODEL,
        prompt: buildTextPrompt(prompt, stylePrompt, backgroundPrompt),
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

/**
 * Build prompt for photo-to-avatar (images.edit).
 * Preserves the person's likeness while applying the user's requested transformation.
 */
function buildPhotoEditPrompt(userPrompt: string, stylePrompt: string, backgroundPrompt?: string): string {
  const parts = [
    "Preserve this person's exact face, facial features, bone structure, skin tone, hair, and full likeness",
    "Do not change who the person is",
    `Transform this person into: ${userPrompt}`,
    `${stylePrompt}`,
    backgroundPrompt ? `${backgroundPrompt}` : null,
    "detailed face, cinematic lighting, high quality portrait, well-composed, centered framing",
  ];

  return parts.filter(Boolean).join(", ");
}

/**
 * Build prompt for text-to-avatar (images.generate).
 * Converts simple user input into a detailed image generation prompt.
 */
function buildTextPrompt(userPrompt: string, stylePrompt: string, backgroundPrompt?: string): string {
  const parts = [
    `${stylePrompt} portrait avatar of ${userPrompt}`,
    backgroundPrompt ? `${backgroundPrompt}` : null,
    "detailed face, cinematic lighting, high quality portrait, well-composed, centered framing, visually striking",
  ];

  return parts.filter(Boolean).join(", ");
}
