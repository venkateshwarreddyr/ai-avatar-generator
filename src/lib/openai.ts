import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use a mainline model with the image_generation tool (Responses API)
const MODEL = "gpt-4.1";

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

  const generateOne = async (): Promise<string> => {
    // Build input content
    const content: OpenAI.Responses.ResponseInputContent[] = [];

    // If user uploaded an image, include it as input for editing
    if (userImageBase64) {
      content.push({
        type: "input_image",
        image_url: `data:${userImageMediaType};base64,${userImageBase64}`,
        detail: "high",
      });
      content.push({
        type: "input_text",
        text: `Transform this photo into a stylized avatar. ${fullPrompt}`,
      });
    } else {
      content.push({
        type: "input_text",
        text: `Draw ${fullPrompt}`,
      });
    }

    const response = await openai.responses.create({
      model: MODEL,
      input: [{ role: "user", content }],
      tools: [
        {
          type: "image_generation",
          size,
          quality,
        },
      ],
      tool_choice: { type: "image_generation" },
    });

    // Extract the generated image from the response
    const imageOutput = response.output.find(
      (output) => output.type === "image_generation_call"
    );

    if (imageOutput && imageOutput.type === "image_generation_call" && imageOutput.result) {
      return imageOutput.result;
    }

    return "";
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
