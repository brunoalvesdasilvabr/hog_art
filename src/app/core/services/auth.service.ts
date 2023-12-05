import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { UserStoreService } from '../store/user-store/user-store.service';
import { AppConstants } from '../constants/appConstants.enum';
import { UserInterface } from '../interfaces/user.interface';
import { StorageKeys } from '../constants/storageKeys.enum';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public router: Router,
    public userStore: UserStoreService,
    private storage: StorageService,
    private http: HttpClient
  ) {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }
  public signIn(form: FormGroup, confirmSignup?: boolean): Promise<any> {
    return Auth.signIn(form.value.email, form.value.password)
      .then((user) => {
        this.userStore.setUser = user;
        if (confirmSignup) {
          this.saveUseronDynamoDb(user);
        }
        this.navigateUser();
      })
      .catch((err) => {
        throw err;
      });
  }
  public signUp(form: FormGroup): Promise<any> {
    return Auth.signUp({
      username: form.value.email,
      password: form.value.password,
    });
  }

  public async confirmSignUp(
    loginForm: FormGroup,
    codeForm: FormGroup
  ): Promise<any> {
    try {
      const confirmedSignup = await Auth.confirmSignUp(
        loginForm.value.email,
        codeForm.value.code
      );
      console.log({ confirmedSignup });
      this.signIn(loginForm, true);
    } catch (err) {
      throw err;
    }
  }

  public saveUseronDynamoDb(user: UserInterface) {
    this.http
      .put(`${environment.backendApi}/api/save-user`, { user: user })
      .subscribe();
  }
  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.storage.remove(StorageKeys.user);
      this.userStore.setUser = null;
      this.router.navigate(['/home']);
    });
  }

  private navigateUser() {
    this.router.navigate(['/home']);
  }
}
