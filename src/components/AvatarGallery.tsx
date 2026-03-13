"use client";

import { useState } from "react";

interface AvatarGalleryProps {
  images: string[];
  prompt: string;
  style: string;
}

export default function AvatarGallery({ images, prompt, style }: AvatarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  const downloadImage = (dataUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `avatar-${style.toLowerCase()}-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    images.forEach((img, i) => {
      setTimeout(() => downloadImage(img, i), i * 300);
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Your Avatars</h3>
          <p className="text-sm text-gray-500 mt-1">
            {style} style &middot; {images.length} generated
          </p>
        </div>
        {images.length > 1 && (
          <button
            onClick={downloadAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download All
          </button>
        )}
      </div>

      {/* Main preview */}
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-gray-900">
        <img
          src={images[selectedIndex]}
          alt={`Avatar ${selectedIndex + 1}`}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-sm text-white/80 line-clamp-2 max-w-[70%]">{prompt}</p>
          <button
            onClick={() => downloadImage(images[selectedIndex], selectedIndex)}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-white text-gray-900 font-medium text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            Download
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                selectedIndex === i
                  ? "border-violet-500 shadow-lg shadow-violet-500/20"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={img} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
              {selectedIndex === i && (
                <div className="absolute inset-0 bg-violet-500/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
