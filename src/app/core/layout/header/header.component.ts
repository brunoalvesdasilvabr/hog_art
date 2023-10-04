import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartStoreService } from 'src/app/shared/stores/shopping-cart-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  shoppingCartStoreItems$!:Observable<ProductInterface[]>
  constructor(private shoppingCartStore:ShoppingCartStoreService){
this.shoppingCartStoreItems$ = this.shoppingCartStore.shoppingCartItems$
  }

}
