import { FileUploadInterface } from './file-upload.interface';

export interface ProductInterface {
  category: string;
  description: string;
  id?: string;
  image: FileUploadInterface[];
  price: number;
  quantity?: number;
  title: string;
  calculatedPrice?: number;
}
export interface SavedProductInterface {
  category: string;
  description: string;
  id?: string;
  image: File[];
  price: number;
  quantity?: number;
  title: string;
  calculatedPrice?: number;
}

export interface ProductsByCategoryInterface {
  category: string;
  items: ProductInterface[];
}
