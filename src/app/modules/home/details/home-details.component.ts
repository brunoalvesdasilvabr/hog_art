import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { CarouselModule } from 'primeng/carousel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
  imports: [CarouselModule],
  standalone: true,
})
export class HomeDetailsComponent {
  product!: ProductInterface;
  constructor(private location: Location) {
    console.log(this.location.getState());
    this.product = this.location.getState() as ProductInterface;
  }
}
