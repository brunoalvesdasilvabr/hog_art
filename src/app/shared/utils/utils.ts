import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/core/constants/appConstants.enum';
import { UserInterface } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  public canShowAdminProperty(user: UserInterface) {
    return user.attributes['custom:role'] === AppConstants.adminRole;
  }
}
