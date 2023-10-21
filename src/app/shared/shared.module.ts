import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

const components = [ProductCardComponent, ErrorMessageComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
