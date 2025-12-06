"use client";

import type { Category } from "@/app/lib/types";

type Props = {
  categories: Category[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mb-6">
      <h2 className="mt-1 mb-3 text-sm font-bold text-emerald-900 flex items-center gap-2">
        <span className="text-lg">🏪</span>
        Shop by Category
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => {
          const isActive = cat.name === selected;
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-600 shadow-lg scale-105"
                  : "bg-white text-gray-700 border-emerald-200 hover:border-emerald-400 hover:shadow-md hover:scale-105"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
