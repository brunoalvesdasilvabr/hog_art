import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { StorageKeys } from 'src/app/core/constants/storageKeys.enum';
import { StorageService } from '../../services/storage/storage.service';
import { UserStoreService } from 'src/app/core/store/user-store/user-store.service';
import { UserInterface } from 'src/app/core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/core/constants/appConstants.enum';
import { Router } from '@angular/router';
import { UtilsService } from '../../utils/utils';

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
    public utilsService: UtilsService,
    private storage: StorageService,
    private userStore: UserStoreService,
    private route: Router
  ) {
    this.getUser();
  }
  addToCart(product: ProductInterface) {
    this.productToAdded.emit(product);
  }

  navigateUser(route: 'details' | 'edit', product: ProductInterface) {
    switch (route) {
      case 'details':
        this.route.navigate([`/home/detalhes/${product.title}`], {
          state: product,
        });
        break;
      case 'edit':
        this.route.navigate(['admin/criar-produto'], {
          queryParams: { action: 'edit' },
          state: product,
        });
        break;

      default:
        break;
    }
  }

  private getUser(): void {
    this.user$ = this.userStore.user$;
  }
}
