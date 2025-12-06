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
    <div className="flex items-center mb-4 gap-2">
      <div className="flex-1 relative">
        <input
          type="search"
          placeholder="Search Harpic / अगरबत्ती / SCR-007..."
          className="w-full p-3 pr-8 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          value={value}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          aria-label="Search products by name or SKU"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
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
