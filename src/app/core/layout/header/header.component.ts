import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  shoppingCartStoreItemsLength$!: Observable<number>;

  constructor(private shoppingCartStore: ShoppingCartStoreService) {
    this.shoppingCartStoreItemsLength$ =
      this.shoppingCartStore.shoppingCartItems$.pipe(
        map((productsArray) => productsArray.length)
      );
  }
}
