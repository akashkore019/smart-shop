"use client";

import { ChangeEvent } from "react";
import VoiceSearchButton from "./VoiceSearchButton";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search Harpic / अगरबत्ती / SCR-007..."
        className="flex-1 p-3 border rounded-lg text-sm bg-white"
        value={value}
        onChange={handleTextChange}
      />
      <VoiceSearchButton onResult={onChange} />
    </div>
  );
}
