import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { take, takeWhile, tap } from 'rxjs';
import { AuthService } from '@instagrammer/web/auth/data-access';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-inst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, AfterViewInit {
  private isAlive = true;
  private intervalId: NodeJS.Timer | undefined;
  private previousScreenshotIndex = 0;
  private activeScreenshotIndex = 1;

  @ViewChild('screenshot_container')
  screenShotContainer: ElementRef | undefined;

  public isSpinnerActive = false;
  public isFormValid = false;

  public formGroup: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly renderer2: Renderer2,
    private readonly formBuilder: FormBuilder,
  ) {
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

  public ngAfterViewInit(): void {
    this.intervalId = setInterval(() => this.animateScreenshots(), 6000);
  }

  public ngOnDestroy(): void {
    this.isAlive = true;

    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);
  }

  private animateScreenshots(): void {
    this.activeScreenshotIndex = this.stepIndex(this.activeScreenshotIndex);
    this.previousScreenshotIndex = this.stepIndex(this.previousScreenshotIndex);

    this.applyStyles();
  }

  private stepIndex(currIndex: number): number {
    if (currIndex === 3) {
      return 0;
    }

    return ++currIndex;
  }

  private applyStyles(): void {
    if (!this.screenShotContainer) {
      throw new Error('Screenshot container undefined.');
    }

    const { children } = this.screenShotContainer.nativeElement;

    const currentActiveScreenshot = children[this.previousScreenshotIndex];
    const newActiveScreenshot = children[this.activeScreenshotIndex];

    for (const childImg of children) {
      this.renderer2.removeClass(childImg, 'current-image');
      this.renderer2.removeClass(childImg, 'new-img');
    }

    this.renderer2.addClass(currentActiveScreenshot, 'current-image');
    this.renderer2.addClass(newActiveScreenshot, 'new-img');
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
