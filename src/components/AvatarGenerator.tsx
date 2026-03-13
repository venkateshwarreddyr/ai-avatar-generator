"use client";

import { useState, useCallback } from "react";
import StylePicker from "./StylePicker";
import ImageUpload from "./ImageUpload";
import AvatarGallery from "./AvatarGallery";
import LoadingAnimation from "./LoadingAnimation";
import { AVATAR_STYLES, BACKGROUNDS, IMAGE_SIZES, AvatarStyleId, ImageSize } from "@/lib/constants";

interface GeneratedResult {
  images: string[];
  prompt: string;
  style: string;
}

interface AvatarGeneratorProps {
  initialPrompt?: string;
  initialStyle?: AvatarStyleId;
  initialBackground?: string;
}

export default function AvatarGenerator({
  initialPrompt,
  initialStyle,
  initialBackground,
}: AvatarGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [styleId, setStyleId] = useState<AvatarStyleId>(initialStyle || "realistic");
  const [backgroundId, setBackgroundId] = useState(initialBackground || "studio");
  const [size, setSize] = useState<ImageSize>("1024x1024");
  const [count, setCount] = useState(1);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt describing your avatar");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          styleId,
          backgroundId,
          size,
          count,
          userImage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult({
        images: data.images,
        prompt: data.prompt,
        style: data.style,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, styleId, backgroundId, size, count, userImage]);

  const selectedStyle = AVATAR_STYLES.find((s) => s.id === styleId);

  return (
    <section id="generator" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Create Your Avatar
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Describe your perfect avatar, choose a style, and let AI do the magic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-8">
            {/* Style Picker */}
            <StylePicker selected={styleId} onSelect={setStyleId} />

            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Describe Your Avatar <span className="text-violet-400">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., professional software engineer, warm smile, wearing a sleek blazer..."
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none transition-all"
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-600">
                  {prompt.length}/1000
                </span>
              </div>
            </div>

            {/* Image Upload */}
            <ImageUpload onImageSelect={setUserImage} currentImage={userImage} />

            {/* Background */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Background</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackgroundId(bg.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      backgroundId === bg.id
                        ? "bg-violet-500/20 border border-violet-500 text-violet-300"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                Advanced Options
              </button>

              {showAdvanced && (
                <div className="mt-4 grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Image Size</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value as ImageSize)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500"
                    >
                      {IMAGE_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s === "1024x1024" ? "Square (1024x1024)" : s === "1024x1536" ? "Portrait (1024x1536)" : "Landscape (1536x1024)"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Number of Avatars
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => setCount(n)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            count === n
                              ? "bg-violet-500 text-white"
                              : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Generate Avatar
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
              )}
            </button>

            {/* Cost indicator */}
            <p className="text-center text-xs text-gray-600">
              Estimated cost: ~${(0.04 * count).toFixed(2)} per generation &middot; Using {selectedStyle?.name} style
            </p>
          </div>

          {/* Right: Results */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {isLoading ? (
              <LoadingAnimation />
            ) : result ? (
              <AvatarGallery
                images={result.images}
                prompt={result.prompt}
                style={result.style}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02]">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-400 mb-2">Your avatars will appear here</h3>
                <p className="text-sm text-gray-600 text-center max-w-xs">
                  Choose a style, write a prompt, and hit generate to create your AI avatar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
