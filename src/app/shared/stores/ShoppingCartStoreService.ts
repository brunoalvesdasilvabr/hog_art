import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStoreService {
  private _shoppingCartItems = new BehaviorSubject<ProductInterface[]>([]);
  public shoppingCartItems$ = this._shoppingCartItems.asObservable();

  private _shoppingCartItemsLength$ = new BehaviorSubject<number>(0);
  public shoppingCartItemsLength$ =
    this._shoppingCartItemsLength$.asObservable();

  constructor() {}

  calcItemQuantity(product: ProductInterface) {
    let cartItems = [...this._shoppingCartItems.getValue()];
    const item = cartItems.find((cartEl) => cartEl.id === product.id);
    if (item) {
      item.quantity!++;
      item.price *= item.quantity!;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    this._shoppingCartItems.next(cartItems);

    // let productFound = false;
    // const quantityCalc = this._shoppingCartItems.getValue().map((cartEl) => {
    //   if (cartEl.id === product.id) {
    //     cartEl.quantity!++;
    //     productFound = true;
    //     return cartEl;
    //   } else {
    //     return cartEl;
    //   }
    // });
    // const result = productFound ? quantityCalc : [...quantityCalc, { ...product, quantity: 1 }];
    // this._shoppingCartItems.next(result);
    // console.log(this._shoppingCartItems.getValue());
  }

  incrementCartItemsLength(): void {
    let itemsAddedToCart = this._shoppingCartItemsLength$.getValue();
    itemsAddedToCart++;
    this._shoppingCartItemsLength$.next(itemsAddedToCart);
  }

  addItem(product: ProductInterface): void {
    this.incrementCartItemsLength();

    const iArrayEmpty = this._shoppingCartItems.getValue().length;
    if (!iArrayEmpty) {
      this._shoppingCartItems.next([{ ...product, quantity: 1 }]);
    } else {
      this.calcItemQuantity(product);
    }
  }
}
