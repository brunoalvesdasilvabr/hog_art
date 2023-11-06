import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { StorageKeys } from 'src/app/core/constants/storageKeys.enum';
import { StorageService } from '../../services/storage/storage.service';
import { UserStoreService } from 'src/app/core/store/user-store/user-store.service';
import { UserInterface } from 'src/app/core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/core/constants/appConstants.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: ProductInterface;
  @Input() edit!: boolean;
  @Output() productToAdded = new EventEmitter<ProductInterface>();
  user$!: Observable<UserInterface | null>;
  constructor(
    private storage: StorageService,
    private userStore: UserStoreService,
    private route: Router
  ) {
    this.getUser();
  }
  addToCart(product: ProductInterface) {
    this.productToAdded.emit(product);
  }

  navigateUser(product: ProductInterface) {
    this.route.navigate(['admin/criar-produto'], {
      state: product,
    });
  }
  setItemToStorage(product: ProductInterface) {
    this.storage.set(StorageKeys.productDetails, product);
  }
  public canShowAdminProperty(user: UserInterface) {
    return user.attributes['custom:role'] === AppConstants.adminRole;
  }
  private getUser(): void {
    this.user$ = this.userStore.user$;
  }
}
