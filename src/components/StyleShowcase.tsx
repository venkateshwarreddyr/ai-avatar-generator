"use client";

import { AVATAR_STYLES } from "@/lib/constants";

export default function StyleShowcase() {
  return (
    <section id="styles" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            8 Stunning Styles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From hyper-realistic portraits to anime and cyberpunk. Each style is carefully crafted to produce incredible results.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AVATAR_STYLES.map((style) => (
            <a
              key={style.id}
              href="#generator"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all hover:scale-[1.03] hover:shadow-xl"
            >
              <div className={`h-32 bg-gradient-to-br ${style.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{style.emoji}</span>
                <h3 className="text-sm font-semibold text-white">{style.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{style.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
