import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';
import { MatButtonModule } from '@angular/material/button';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AdminComponent, CreateProductComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    CarouselModule,
    ReactiveFormsModule,
    ToastModule,
    MatInputModule,
    MatFormFieldModule,
    ButtonModule,
    FileUploadModule,
    MatSelectModule,
  ],
  providers: [MessageService],
})
export class AdminModule {}
