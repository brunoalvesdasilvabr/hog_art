import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../store/user-store/user-store.service';
import { AppConstants } from '../constants/appConstants.enum';

export const AdminGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStoreService);
  const router = inject(Router);
  const user = userStore.getUser;

  if (user) {
    if (user!.attributes['custom:role'] !== AppConstants.adminRole) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
