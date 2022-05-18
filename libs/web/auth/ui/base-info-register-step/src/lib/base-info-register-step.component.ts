import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterDto } from '@instagrammer/api/auth/data-access';
import {
  BehaviorSubject,
  distinctUntilChanged,
  first,
  map,
  Observable,
  tap,
} from 'rxjs';
import { AuthApiService } from '@instagrammer/web/auth/data-access';

@Component({
  selector: 'ng-insta-base-info-register-step',
  templateUrl: './base-info-register-step.component.html',
  styleUrls: ['./base-info-register-step.component.scss'],
})
export class BaseInfoRegisterStepComponent implements OnDestroy {
  @Output()
  next: EventEmitter<RegisterDto> = new EventEmitter();

  public readonly isFormDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public registerFormGroup: FormGroup;

  private isAlive = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authApiService: AuthApiService,
  ) {
    this.registerFormGroup = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required]),
      username: new FormControl(
        '',
        [Validators.required, Validators.minLength(5)],
        [this.checkIfUsernameIsAvailable().bind(this)],
      ),
      password: new FormControl('', [Validators.required]),
    });
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  private checkIfUsernameIsAvailable(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authApiService.checkIfUsernameExists({ username: control.value }).pipe(
        first(),
        distinctUntilChanged(),
        map(result => (!result.isUsernameAvailable ? { invalid: true } : null)),
        tap(() => setTimeout(() => this.validateRegisterForm())),
      );
    };
  }

  public onCtaClick(): void {
    const { email, fullName, username, password } = this.registerFormGroup.value;

    this.next.emit({ fullName, password, username, email });
  }

  private validateRegisterForm(): void {
    this.registerFormGroup.markAsTouched();

    if (this.registerFormGroup.valid) {
      this.isFormDisabled$.next(false);

      return;
    }

    this.isFormDisabled$.next(true);
  }
}
