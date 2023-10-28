export interface ProductInterface {
  category: string;
  description: string;
  id?: string;
  image: string[];
  price: number;
  quantity?: number;
  title: string;
  calculatedPrice?: number;
}

export interface ProductsByCategoryInterface {
  category: string;
  items: ProductInterface[];
}
