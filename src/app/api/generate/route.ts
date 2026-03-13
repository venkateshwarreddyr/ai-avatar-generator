import { NextRequest, NextResponse } from "next/server";
import { generateAvatar } from "@/lib/openai";
import { AVATAR_STYLES, BACKGROUNDS } from "@/lib/constants";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { prompt, styleId, backgroundId, size, quality, count, userImage } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: "Prompt must be under 1000 characters" }, { status: 400 });
    }

    const style = AVATAR_STYLES.find((s) => s.id === styleId);
    if (!style) {
      return NextResponse.json({ error: "Invalid style selected" }, { status: 400 });
    }

    const background = backgroundId ? BACKGROUNDS.find((b) => b.id === backgroundId) : null;
    const imageCount = Math.min(Math.max(Number(count) || 1, 1), 4);

    // Validate user image if provided
    let userImageBase64: string | undefined;
    let userImageMediaType: string | undefined;
    if (userImage) {
      const matches = userImage.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches || !ALLOWED_TYPES.includes(matches[1])) {
        return NextResponse.json({ error: "Invalid image format. Use PNG, JPEG, or WebP." }, { status: 400 });
      }
      userImageMediaType = matches[1] as string;
      userImageBase64 = matches[2] as string;
      const imageSize = Buffer.from(userImageBase64, "base64").length;
      if (imageSize > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 });
      }
    }

    const images = await generateAvatar({
      prompt: prompt.trim(),
      stylePrompt: style.prompt,
      backgroundPrompt: background?.prompt,
      size: size || "1024x1024",
      quality: quality || "high",
      count: imageCount,
      userImageBase64,
      userImageMediaType,
    });

    return NextResponse.json({
      images: images.map((b64) => `data:image/png;base64,${b64}`),
      prompt: prompt.trim(),
      style: style.name,
    });
  } catch (error) {
    console.error("Avatar generation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Rate limit exceeded. Please wait and try again." }, { status: 429 });
      }
      if (error.message.includes("billing") || error.message.includes("quota")) {
        return NextResponse.json({ error: "API quota exceeded. Check your OpenAI billing." }, { status: 402 });
      }
      if (error.message.includes("content_policy")) {
        return NextResponse.json(
          { error: "Content policy violation. Please modify your prompt." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ error: "Failed to generate avatar. Please try again." }, { status: 500 });
  }
}
