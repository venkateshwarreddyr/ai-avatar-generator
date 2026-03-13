"use client";

import { useCallback, useState } from "react";

interface ImageUploadProps {
  onImageSelect: (dataUrl: string | null) => void;
  currentImage: string | null;
}

export default function ImageUpload({ onImageSelect, currentImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 10 * 1024 * 1024) {
        alert("Image must be under 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Upload Photo <span className="text-gray-500">(optional)</span>
      </label>

      {currentImage ? (
        <div className="relative group">
          <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-white/10">
            <img src={currentImage} alt="Uploaded" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={() => onImageSelect(null)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? "border-violet-500 bg-violet-500/10"
              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
          }`}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-violet-400 font-medium">Click to upload</span> or drag & drop
          </div>
          <div className="text-xs text-gray-600">PNG, JPEG, WebP up to 10MB</div>
        </div>
      )}
    </div>
  );
}
