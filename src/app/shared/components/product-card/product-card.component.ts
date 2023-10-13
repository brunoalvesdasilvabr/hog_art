import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { StorageService } from '../../services/storage.service';
import { StorageKeys } from 'src/app/core/constants/storageKeys.enum';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: ProductInterface;
  @Output() productToAdded = new EventEmitter<ProductInterface>();
  constructor(private storage: StorageService) {}
  addToCart(product: ProductInterface) {
    this.productToAdded.emit(product);
  }
  setItemToStorage(product: ProductInterface) {
    this.storage.set(StorageKeys.productDetails, product);
  }
}
