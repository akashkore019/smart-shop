import { NextResponse } from "next/server";
import { mockProducts } from "../../lib/products";

export async function GET() {
  // later replace mockProducts with DB fetch
  return NextResponse.json({ products: mockProducts });
}
