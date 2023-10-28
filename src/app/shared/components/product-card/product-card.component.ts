import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { StorageKeys } from 'src/app/core/constants/storageKeys.enum';
import { StorageService } from '../../services/storage/storage.service';

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
    console.log({ product });
    this.productToAdded.emit(product);
  }
  setItemToStorage(product: ProductInterface) {
    this.storage.set(StorageKeys.productDetails, product);
  }
}
