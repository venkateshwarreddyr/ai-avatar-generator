"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
                <path d="M2 21a10 10 0 0 1 20 0" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AvatarAI
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#generator" className="text-sm text-gray-400 hover:text-white transition-colors">
              Generator
            </a>
            <a href="#styles" className="text-sm text-gray-400 hover:text-white transition-colors">
              Styles
            </a>
            <a href="#presets" className="text-sm text-gray-400 hover:text-white transition-colors">
              Presets
            </a>
          </nav>

          <a
            href="#generator"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
