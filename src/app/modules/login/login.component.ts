import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorInterface } from 'src/app/shared/interfaces/error.interface';
import { ErrorStoreService } from 'src/app/shared/stores/error-store/error-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  errorMessage$!: Observable<ErrorInterface>;
  userAction!: 'login' | 'signup';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.patternValidator(),
    ]),
  });

  constructor(
    private authService: AuthService,
    private errorStore: ErrorStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.errorMessage$ = this.errorStore.errorContent$;
  }
  ngOnInit(): void {
    this.userAction = this.route.snapshot.queryParams['action'];
    this.loginForm.valueChanges.subscribe(() => {
      this.errorStore.clearError();
    });
    // this.AddConfirmPasswordControl()
  }
  ngOnDestroy(): void {
    this.errorStore.clearError();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.authService
      .signIn(this.loginForm)
      .then(() => this.errorStore.clearError())
      .catch(() => {
        this.errorStore.setError = {
          error: true,
          message: 'senha ou email invalídos',
        };
      });
  }
  // private AddConfirmPasswordControl(){
  //   if (this.userAction === 'signup') {
  //     this.loginForm.addControl(
  //       'confirmPassword',
  //       new FormControl('', [
  //         Validators.required,
  //         this.patternValidator(),
  //         this.checkPasswords(),
  //       ])
  //     );
  //   }
  // }
  private checkPasswords(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      // group.setValidators(Validators.required);
      let pass = group.parent?.value.password;
      let confirmPass = group.value;

      return pass === confirmPass ? null : { notSame: true };
      return {};
    };
  }

  private patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
