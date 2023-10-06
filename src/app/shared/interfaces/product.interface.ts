export interface ProductInterface {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity?: number;
  rating: { rate: 3.9; count: 120 };
  title: string;
  calculatedPrice: number;
}

export interface ProductsByCategoryInterface {
  category: string;
  items: ProductInterface[];
}
