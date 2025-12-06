import HomePageClient from "./HomePageClient";
import { mockProducts } from "@/lib/products";

export default function Page() {
  return <HomePageClient initialProducts={mockProducts} />;
}
