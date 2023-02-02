import { Component, OnDestroy } from '@angular/core';
import { catchError, finalize, of, take, takeWhile, tap } from 'rxjs';
import { AuthService } from '@instagrammer/web/auth/data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDto } from '@instagrammer/shared/data/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ng-inst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private isAlive = true;
  public isSpinnerActive = false;
  public isFormValid = false;
  public showErrorMessage = false;
  public errorMessage = '';

  public formGroup: FormGroup;

  constructor(private readonly authService: AuthService, private readonly formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      phoneOrUsernameOrEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.formGroup.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        tap(values => this.validateForm(values)),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  public onLogInClick(): void {
    if (!this.isFormValid) {
      return;
    }

    this.toggleSpinner();

    const phoneOrUsernameOrEmail = this.formGroup.get('phoneOrUsernameOrEmail')?.value;
    const password = this.formGroup.get('password')?.value;

    const loginRequestDto: LoginRequestDto = {
      username: phoneOrUsernameOrEmail.match(/^\S+@\S+\.\S+$/) ? null : phoneOrUsernameOrEmail,
      email: phoneOrUsernameOrEmail.match(/^\S+@\S+\.\S+$/) ? phoneOrUsernameOrEmail : null,
      password,
    };

    setTimeout(() => {
      this.authService
        .login(loginRequestDto)
        .pipe(
          take(1),
          catchError((err: HttpErrorResponse) => {
            this.errorMessage = err.error.message;
            this.showErrorMessage = true;

            return of(null);
          }),
          finalize(() => this.toggleSpinner()),
        )
        .subscribe();
    }, 2000);
  }

  private validateForm(values: { phoneOrUsernameOrEmail: string; password: string }): void {
    const { phoneOrUsernameOrEmail, password } = values;

    if (!password || !phoneOrUsernameOrEmail) {
      this.isFormValid = false;

      return;
    }

    if (password.length < 6 || phoneOrUsernameOrEmail.length < 3) {
      this.isFormValid = false;

      return;
    }

    this.isFormValid = true;
  }

  private toggleSpinner(): void {
    this.isSpinnerActive = !this.isSpinnerActive;
  }
}
