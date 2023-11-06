import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/product/products.service';
import { Observable, map, tap } from 'rxjs';
import {
  ProductInterface,
  ProductsByCategoryInterface,
} from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartStoreService } from 'src/app/shared/stores/ShoppingCartStoreService';
import { MessageService } from 'primeng/api';
import { UserStoreService } from 'src/app/core/store/user-store/user-store.service';
import { UserInterface } from 'src/app/core/interfaces/user.interface';
import { AppConstants } from 'src/app/core/constants/appConstants.enum';
import { UtilsService } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$!: Observable<ProductsByCategoryInterface[]>;
  user$!: Observable<UserInterface | null>;
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
    public utilsService: UtilsService,
    private productsService: ProductsService,
    private shoppingCartSTore: ShoppingCartStoreService,
    private toast: MessageService,
    private userStore: UserStoreService
  ) {
    this.getUser();
  }

  ngOnInit(): void {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((res) => {
        const productsByCategory = this.handleProductsByCategory(res);
        return productsByCategory;
      }),
      tap((res) => console.log(res))
    );
  }

  public addToCart(product: ProductInterface): void {
    this.shoppingCartSTore.addItem(product);
    this.toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Adicionado ao carrinho',
    });
  }

  private handleProductsByCategory(
    res: ProductInterface[]
  ): ProductsByCategoryInterface[] {
    const newObj: ProductsByCategoryInterface[] = [];
    const arrayOfCategories = Array.from(new Set(res.map((el) => el.category)));
    res.forEach((el, i) => {
      const productsFiltered = res.filter(
        (el) => el.category === arrayOfCategories[i]
      );
      if (productsFiltered && arrayOfCategories[i]) {
        console.log({ productsFiltered });
        newObj.push({
          category: arrayOfCategories[i],
          items: productsFiltered,
        });
      }
    });
    return newObj;
  }
  private getUser(): void {
    this.user$ = this.userStore.user$;
  }
}
