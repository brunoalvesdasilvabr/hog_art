import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorInterface } from '../../interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorStoreService {
  private _errorContent = new Subject<ErrorInterface>();
  public errorContent$ = this._errorContent.asObservable();
  constructor() {}

  set setError(err: ErrorInterface) {
    console.log({ err });
    this._errorContent.next(err);
  }

  clearError() {
    this._errorContent.next({ message: '', error: false });
  }
}
