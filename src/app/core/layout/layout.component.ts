import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorInterface } from 'src/app/shared/interfaces/error.interface';
import { ErrorStoreService } from 'src/app/shared/stores/error-store/error-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  errorMessage$!: Observable<ErrorInterface>;
  constructor(private errorStore: ErrorStoreService) {
    this.errorMessage$ = this.errorStore.errorContent$;
  }
}
