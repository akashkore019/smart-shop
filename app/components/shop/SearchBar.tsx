"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import VoiceSearchButton from "./VoiceSearchButton";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onChange("");
    }
  };

  const handleClear = () => onChange("");

  return (
    <div className="flex items-center mb-6 gap-2">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
          🔍
        </div>
        <input
          type="search"
          placeholder="Search Harpic / अगरबत्ती / SCR-007..."
          className="w-full pl-10 pr-10 py-3 border-2 border-emerald-100 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
          value={value}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          aria-label="Search products by name or SKU"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center transition-all"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <VoiceSearchButton onResult={onChange} />
    </div>
  );
}
