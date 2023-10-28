import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { AdminGuard } from './core/guards/admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('../app/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: () =>
      import('../app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'carrinho',
    component: LayoutComponent,
    loadChildren: () =>
      import('../app/modules/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('../app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
