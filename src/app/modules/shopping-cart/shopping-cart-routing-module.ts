import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes:Routes = [
  {
      path:"",
      redirectTo:'',
      pathMatch:'full'
  },{
    path:'',
    component:ShoppingCartComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class ShoppingCartRoutingModule { }
