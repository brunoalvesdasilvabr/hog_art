import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Observable, map, tap } from 'rxjs';
import {
  ProductInterface,
  ProductsByCategoryInterface,
} from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';
import { MessageService } from 'primeng/api';
import { UserStoreService } from 'src/app/core/store/user-store/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$!: Observable<ProductsByCategoryInterface[]>;

  carouselAutoPLay: number = 10000;
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '1021px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '775px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '545px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor(
    private productsService: ProductsService,
    private shoppingCartSTore: ShoppingCartStoreService,
    private toast: MessageService,
    private userStore: UserStoreService
  ) {
    this.userStore.getUser;
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((res) => {
        const productsByCategory = this.handleProductsByCategory(res);
        console.log({ productsByCategory });
        return productsByCategory;
      }),
      tap((res) => console.log(res))
    );
  }

  handleProductsByCategory(res: ProductInterface[]) {
    const newObj: ProductsByCategoryInterface[] = [];
    const arrayOfCategories = Array.from(new Set(res.map((el) => el.category)));
    res.forEach((el, i) => {
      const productsFiltered = res.filter(
        (el) => el.category === arrayOfCategories[i]
      );
      if (productsFiltered && arrayOfCategories[i]) {
        newObj.push({
          category: arrayOfCategories[i],
          items: productsFiltered,
        });
      }
    });
    return newObj;
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
