import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStoreService {
  private _shoppingCartItems = new BehaviorSubject<ProductInterface[]>([]);
  public shoppingCartItems$ = this._shoppingCartItems.asObservable();

  constructor() {}

  get Total(): number {
    return this.calculateTotalPrice();
  }

  get getshoppingCartItemsValue(): ProductInterface[] {
    return this._shoppingCartItems.getValue();
  }

  calcItemQuantity(product: ProductInterface) {
    this.handlecalcItemQuantity(product);

    // let productFound = false;
    // const quantityCalc = this.getshoppingCartItemsValue.map((cartEl) => {
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
    // console.log(this.getshoppingCartItemsValue);
  }

  addOrRemoveQuantity(product: ProductInterface, add: boolean) {
    this.handleAddOrRemove(product, add);
  }

  addItem(product: ProductInterface): void {
    this.setInicialCalculatedPrice(product);
    const isCartItemsEmpty = this.getshoppingCartItemsValue.length;
    if (!isCartItemsEmpty) {
      this._shoppingCartItems.next([{ ...product, quantity: 1 }]);
    } else {
      this.calcItemQuantity(product);
    }
  }

  removeProduct(product: ProductInterface) {
    const productRemoved = this._shoppingCartItems
      .getValue()
      .filter((el) => el.id !== product.id);
    this._shoppingCartItems.next(productRemoved);
  }

  private calculateTotalPrice(): number {
    return this._shoppingCartItems
      .getValue()
      .map((product) => product.price * product.quantity!)
      .reduce((prev, current) => prev + current, 0);
  }

  private setInicialCalculatedPrice(product: ProductInterface) {
    product.calculatedPrice = product.price;
  }

  private handlecalcItemQuantity(product: ProductInterface) {
    let cartItems = [...this.getshoppingCartItemsValue];
    const item = cartItems.find((cartEl) => cartEl.id === product.id);
    if (item) {
      item.quantity!++;
      item.calculatedPrice = item.price * item.quantity!;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    this._shoppingCartItems.next(cartItems);
  }

  private handleAddOrRemove(product: ProductInterface, add: boolean) {
    let cartArray = [...this.getshoppingCartItemsValue];
    const productToAddQnt = cartArray.filter((items) => items.id == product.id);
    add ? productToAddQnt[0].quantity!++ : productToAddQnt[0].quantity!--;
    productToAddQnt[0].calculatedPrice =
      productToAddQnt[0].price * productToAddQnt[0].quantity!;
    console.log({ productToAddQnt });
    if (productToAddQnt[0].quantity! === 0) {
      cartArray = cartArray.filter((items) => items.id !== product.id);
    }
    this._shoppingCartItems.next(cartArray);
  }
}
