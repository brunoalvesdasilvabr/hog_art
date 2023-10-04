import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {
   }


  getAllProducts():Observable<ProductInterface[]>{
    console.log('opaa')
     return this.http.get<ProductInterface[]>('https://fakestoreapi.com/products')
  }
}
