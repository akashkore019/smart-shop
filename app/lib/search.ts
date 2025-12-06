import { Product } from "./types";

const synonymMap: Record<string, string[]> = {
  agarbatti: ["agarbatti", "अगरबत्ती", "अगर बत्ती", "धूप", "dhoop"],
  phenyl: ["phenyl", "फिनाइल", "फिनायल"],
  bucket: ["bucket", "बाल्टी", "balti"],
  harpic: ["harpic", "हार्पिक"],
};

function normalizeString(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function buildSearchTokens(query: string): string[] {
  const q = normalizeString(query);
  if (!q) return [];

  const tokens = [q];

  for (const [base, variants] of Object.entries(synonymMap)) {
    if (variants.some((v) => normalizeString(v) === q)) {
      tokens.push(base);
      tokens.push(...variants.map((v) => normalizeString(v)));
    }
  }

  return Array.from(new Set(tokens));
}

export function filterProducts(
  products: Product[],
  query: string,
  category: string
): Product[] {
  const tokens = buildSearchTokens(query);

  return products.filter((p) => {
    if (p.status !== "active") return false;

    const matchCategory = category === "All" || p.category === category;

    if (!tokens.length) return matchCategory;

    const name = normalizeString(p.name);
    const sku = normalizeString(p.sku);

    const matches = tokens.some(
      (t) => name.includes(t) || sku.includes(t)
    );

    return matchCategory && matches;
  });
}
