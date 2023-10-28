import { TestBed } from '@angular/core/testing';

import { ShoppingCartStoreService } from './ShoppingCartStoreService';

describe('ShoppingCartStoreService', () => {
  let service: ShoppingCartStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
