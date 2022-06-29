import { Component, OnDestroy } from '@angular/core';
import { take, takeWhile, tap } from 'rxjs';
import { AuthService } from '@instagrammer/web/auth/data-access';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-inst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private isAlive = true;
  public isSpinnerActive = false;
  public isFormValid = false;

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

  public login(username: string, password: string): void {
    this.authService
      .login({ username, password })
      .pipe(take(1))
      .subscribe(result => console.log('Result ', result));
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  public onLogInClick(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isSpinnerActive = !this.isSpinnerActive;

    const phoneOrUsernameOrEmail = this.formGroup.get('phoneOrUsernameOrEmail')?.value;
    const password = this.formGroup.get('password')?.value;

    setTimeout(() => {
      this.authService
        .login({ username: phoneOrUsernameOrEmail, password })
        .pipe(
          take(1),
          tap(() => (this.isSpinnerActive = !this.isSpinnerActive)),
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
}
