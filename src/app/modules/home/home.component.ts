import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Observable, map, tap } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$!: Observable<ProductInterface[]>;
  constructor(
    private productsService: ProductsService,
    private shoppingCartSTore: ShoppingCartStoreService,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((res) => res),
      tap((res) => console.log(res))
    );
  }

  addToCart(product: ProductInterface) {
    this.shoppingCartSTore.addItem(product);
    this.toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Adicionado ao carrinho',
    });
  }
}
