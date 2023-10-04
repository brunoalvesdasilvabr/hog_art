import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-rouitng-module';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers:[ProductsService]
})
export class HomeModule { }
