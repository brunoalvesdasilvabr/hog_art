import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private readonly _user = new BehaviorSubject(null)
user$ = this._user.asObservable()
  constructor() { }
}
