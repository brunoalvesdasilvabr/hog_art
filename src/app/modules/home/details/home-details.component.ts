import { Component } from '@angular/core';
import { StorageKeys } from 'src/app/core/constants/storageKeys.enum';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
import { CarouselModule } from 'primeng/carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
  imports: [CarouselModule],
  standalone: true,
})
export class HomeDetailsComponent {
  product!: ProductInterface;
  constructor(private storage: StorageService) {
    this.product = this.storage.get(StorageKeys.productDetails);
  }
}
