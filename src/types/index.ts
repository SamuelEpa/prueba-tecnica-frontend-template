export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
  complexScore?: number;
}

export interface Stats {
  totalItems: number;
  totalValue: number;
}

