"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
                <path d="M2 21a10 10 0 0 1 20 0" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-400">AvatarAI</span>
          </div>

          <p className="text-sm text-gray-600">
            Built with Next.js, Tailwind CSS & OpenAI gpt-image-1
          </p>

          <div className="flex items-center gap-6">
            <a href="https://platform.openai.com/docs/guides/images" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              API Docs
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
