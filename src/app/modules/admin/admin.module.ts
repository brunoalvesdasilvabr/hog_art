import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing-module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    CarouselModule,
  ],
  providers: [],
})
export class AdminModule {}
