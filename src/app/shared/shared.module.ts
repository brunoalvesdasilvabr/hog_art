import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';

const components = [
  ProductCardComponent,
  ErrorMessageComponent,
  FileUploadComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule, MatButtonModule],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
