import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged, first, map, Observable, takeWhile, tap } from 'rxjs';
import { AuthApiService, RegisterNoDobDto } from '@instagrammer/web/auth/data';
import { InputComponent } from '@instagrammer/web/shared/ui/input';
import { UserApi } from '@instagrammer/shared/data/api';

@Component({
  selector: 'ng-insta-base-info-register-step',
  templateUrl: './base-info-register-step.component.html',
  styleUrls: ['./base-info-register-step.component.scss'],
})
export class BaseInfoRegisterStepComponent implements OnDestroy, OnInit {
  /**
   * Used only if coming back from dob component
   */
  @Input()
  formData: RegisterNoDobDto | null = null;

  @Output()
  next: EventEmitter<UserApi.RegisterRequestDto> = new EventEmitter();

  @ViewChildren(InputComponent) inputComponents!: QueryList<InputComponent>;

  public readonly isFormDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public registerFormGroup: FormGroup;

  private isAlive = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    //  FIXME: Refactor, move this from UI
    private readonly authApiService: AuthApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
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

    this.registerFormGroup.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        tap(() => this.validateRegisterForm()),
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.setInitialFormData();
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  private setInitialFormData(): void {
    if (!this.formData || !this.registerFormGroup) {
      return;
    }

    this.registerFormGroup.patchValue({
      email: this.formData.email,
      fullName: this.formData.fullName,
      username: this.formData.username,
      password: this.formData.password,
    });

    this.changeDetectorRef.detectChanges();

    this.inputComponents.forEach(item => item.markAsTouchedAndDirty());
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

    this.next.emit({ fullName, password, username, email, dob: new Date() });
  }

  private validateRegisterForm(): void {
    this.registerFormGroup.markAsTouched();

    if (this.registerFormGroup.valid && !this.registerFormGroup.pending) {
      this.isFormDisabled$.next(false);

      return;
    }

    this.isFormDisabled$.next(true);
  }
}
