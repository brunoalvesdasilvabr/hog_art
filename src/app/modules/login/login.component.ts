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
  hasMatchError = false;
  userAction!: 'login' | 'signup';
  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword?: FormControl<string | null>;
  }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.patternValidator(),
      this.matchValidator('confirmPassword', true),
    ]),
  });

  constructor(
    private authService: AuthService,
    private errorStore: ErrorStoreService,
    private route: ActivatedRoute
  ) {
    this.errorMessage$ = this.errorStore.errorContent$;
  }
  ngOnInit(): void {
    this.userAction = this.route.snapshot.queryParams['action'];
    this.AddConfirmPasswordControl();

    console.log('useraction', this.userAction);
    this.loginForm.valueChanges.subscribe(() => {
      this.errorStore.clearError();
    });
    this.handleErrorConfirmPassword();
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
  private handleErrorConfirmPassword() {
    this.loginForm.controls.confirmPassword?.valueChanges.subscribe(() => {
      if (this.loginFormControl.confirmPassword!.errors?.['matching']) {
        this.hasMatchError = true;
      } else {
        this.hasMatchError = false;
      }
    });
  }
  private AddConfirmPasswordControl() {
    if (this.userAction === 'signup') {
      this.loginForm.addControl(
        'confirmPassword',
        new FormControl('', [
          Validators.required,
          this.patternValidator(),
          this.matchValidator('password'),
        ])
      );
    }
  }
  private matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
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
