import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';
import { UserStoreService } from '../../store/user-store/user-store.service';
import { UserInterface } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  shoppingCartStoreItemsLength$!: Observable<number>;
  user$!: Observable<UserInterface | null>;
  constructor(
    private shoppingCartStore: ShoppingCartStoreService,
    private userStore: UserStoreService,
    private authService: AuthService
  ) {
    this.getUser();
    this.getCartLength();
  }

  public logout() {
    this.authService.signOut();
  }
  private getCartLength(): void {
    this.shoppingCartStoreItemsLength$ =
      this.shoppingCartStore.shoppingCartItems$.pipe(
        map((productsArray) => productsArray.length)
      );
  }

  private getUser(): void {
    this.user$ = this.userStore.user$;
  }
}
