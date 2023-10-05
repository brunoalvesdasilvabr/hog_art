import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    TableModule,
    SharedModule
  ]
})
export class ShoppingCartModule { }
