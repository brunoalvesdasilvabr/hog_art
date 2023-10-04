import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartStoreService {
  private  _shoppingCartItems = new BehaviorSubject<ProductInterface[]>([])
  shoppingCartItems$ = this._shoppingCartItems.asObservable()
  constructor() { }


  addItem(product:ProductInterface):void{
    this._shoppingCartItems.next([...this._shoppingCartItems.getValue(),product])
  }

 
}
