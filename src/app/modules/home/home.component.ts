import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Observable, map, tap } from 'rxjs';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { ShoppingCartStoreService } from '../../shared/stores/shopping-cart-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$!:Observable<ProductInterface[]>
  constructor(private productsService:ProductsService, private shoppingCartSTore:ShoppingCartStoreService){

  }

ngOnInit(): void {
 this.products$ =  this.productsService.getAllProducts().pipe(map((res)=>res),tap((res)=>console.log(res)))
}

addToCart(product:ProductInterface){
this.shoppingCartSTore.addItem(product)
}

}
