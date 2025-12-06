"use client";

import type { Category } from "@/lib/types";

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
    <div>
      <h2 className="mt-1 mb-2 text-sm font-semibold text-emerald-900">
        Shop by Category
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isActive = cat.name === selected;
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(cat.name)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
