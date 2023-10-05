import { Component } from '@angular/core';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';
import { Observable,map,filter,tap,combineLatest,forkJoin } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
shoppingCartItems$:Observable<ProductInterface[]>
  constructor(private shoppingCartStorage:ShoppingCartStoreService){
 this.shoppingCartItems$ =  this.shoppingCartStorage.shoppingCartItems$
    
 }

}
