import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '@instagrammer/web/auth/data-access';

@Component({
  selector: 'ng-inst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, AfterViewInit {
  private intervalId: NodeJS.Timer | undefined;
  private previousScreenshotIndex = 0;
  private activeScreenshotIndex = 1;

  @ViewChild('screenshot_container')
  screenShotContainer: ElementRef | undefined;

  public isSpinnerActive = false;

  constructor(private readonly authService: AuthService, private readonly renderer2: Renderer2) {}

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

    console.log(children[this.previousScreenshotIndex]);

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
    this.isSpinnerActive = !this.isSpinnerActive;
  }
}
