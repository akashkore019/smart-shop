export type ProductStatus = "active" | "hidden";

export type Product = {
  id: string; // same as sku for now
  sku: string;
  name: string;
  category: string;
  price: number;
  costPrice?: number;
  unit: string; // Piece, Packet, Bottle
  stock: number;
  image?: string;
  status: ProductStatus;
  createdAt?: number;
  updatedAt?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Category = {
  name: string;
  icon: string;
};
