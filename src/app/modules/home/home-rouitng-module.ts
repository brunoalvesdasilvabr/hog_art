import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes:Routes = [
  {
      path:"",
      redirectTo:'',
      pathMatch:'full'
  },{
    path:'',
    component:HomeComponent
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
export class HomeRoutingModule { }
