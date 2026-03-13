"use client";

const TIPS = [
  "Detailed prompts produce better results...",
  "Try combining styles with specific backgrounds...",
  "Adding profession details makes avatars unique...",
  "Upload a photo for personalized results...",
];

export default function LoadingAnimation() {
  const tipIndex = Math.floor(Math.random() * TIPS.length);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Animated rings */}
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border-4 border-fuchsia-500/30 animate-ping" style={{ animationDelay: "0.3s" }} />
        <div className="absolute inset-4 rounded-full border-4 border-pink-500/40 animate-ping" style={{ animationDelay: "0.6s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center animate-pulse shadow-2xl shadow-violet-500/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
              <path d="M2 21a10 10 0 0 1 20 0" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-white">Generating your avatar...</h3>
        <p className="text-sm text-gray-500">This usually takes 5-15 seconds</p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full animate-loading-bar" />
      </div>

      {/* Tip */}
      <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 max-w-sm">
        <p className="text-xs text-gray-400 text-center">
          <span className="text-violet-400 font-medium">Tip:</span> {TIPS[tipIndex]}
        </p>
      </div>
    </div>
  );
}
