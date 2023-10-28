import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/core/guards/admin-guard.guard';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [{ path: 'criar-produto', component: CreateProductComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
