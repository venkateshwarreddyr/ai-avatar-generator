"use client";

import { AVATAR_STYLES, AvatarStyleId } from "@/lib/constants";

interface StylePickerProps {
  selected: AvatarStyleId;
  onSelect: (id: AvatarStyleId) => void;
}

export default function StylePicker({ selected, onSelect }: StylePickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Choose Style <span className="text-violet-400">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {AVATAR_STYLES.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id as AvatarStyleId)}
              className={`relative group p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="text-2xl mb-2">{style.emoji}</div>
              <div className={`text-sm font-semibold ${isSelected ? "text-violet-300" : "text-white"}`}>
                {style.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">{style.description}</div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
