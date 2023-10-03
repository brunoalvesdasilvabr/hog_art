import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule,Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const components = [ 
  HeaderComponent,
  FooterComponent,
  ]

@NgModule({
  declarations:[...components, LayoutComponent]
  ,
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[...components]
})
export class LayoutModule { }
