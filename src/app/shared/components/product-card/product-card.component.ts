import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: ProductInterface;
  @Output() productToAdded = new EventEmitter<ProductInterface>();
  addToCart(product: ProductInterface) {
    this.productToAdded.emit(product);
  }
}
