"use client";

import { PRESET_PROMPTS, AvatarStyleId } from "@/lib/constants";

interface PresetPromptsProps {
  onSelect: (prompt: string, styleId: AvatarStyleId, backgroundId: string) => void;
}

export default function PresetPrompts({ onSelect }: PresetPromptsProps) {
  const gradients = [
    "from-violet-600/20 to-fuchsia-600/20 hover:from-violet-600/30 hover:to-fuchsia-600/30 border-violet-500/20",
    "from-pink-600/20 to-rose-600/20 hover:from-pink-600/30 hover:to-rose-600/30 border-pink-500/20",
    "from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border-cyan-500/20",
    "from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border-emerald-500/20",
    "from-amber-600/20 to-yellow-600/20 hover:from-amber-600/30 hover:to-yellow-600/30 border-amber-500/20",
    "from-red-600/20 to-pink-600/20 hover:from-red-600/30 hover:to-pink-600/30 border-red-500/20",
  ];

  return (
    <section id="presets" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Quick Start Presets
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Click any preset to instantly populate the generator with curated prompts and styles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_PROMPTS.map((preset, i) => (
            <button
              key={preset.title}
              onClick={() => onSelect(preset.prompt, preset.style, preset.background)}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${gradients[i]} border backdrop-blur-sm text-left transition-all hover:scale-[1.02] hover:shadow-xl`}
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {preset.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{preset.prompt}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300">
                  {preset.style}
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300">
                  {preset.background}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
