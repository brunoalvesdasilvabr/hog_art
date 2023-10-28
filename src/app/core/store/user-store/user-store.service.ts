import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserInterface } from '../../interfaces/user.interface';
import { StorageKeys } from '../../constants/storageKeys.enum';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _user = new BehaviorSubject<UserInterface | null>(null);
  user$ = this._user.asObservable();
  constructor(private storage: StorageService, private router: Router) {}

  set setUser(user: UserInterface | null) {
    this.storage.set(StorageKeys.user, user);
    this._user.next(user);
  }

  get getUser(): UserInterface | null {
    const userFromStorage = this.storage.get(StorageKeys.user);
    if (userFromStorage) {
      this.setUser = userFromStorage;
      return userFromStorage;
    } else {
      return null;
    }
  }
}
