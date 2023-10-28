import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...components, LayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [...components],
})
export class LayoutModule {}
