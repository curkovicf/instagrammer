import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'ng-insta-rotating-phones',
  template: `
    <div #screenshot_container class="phones">
      <img class="login-img current-image" src="/assets/images/screenshot_1.png" alt="" />
      <img class="login-img new-img" src="/assets/images/screenshot_2.png" alt="" />
      <img class="login-img" src="/assets/images/screenshot_3.png" alt="" />
      <img class="login-img" src="/assets/images/screenshot_4.png" alt="" />
    </div>
  `,
  styleUrls: ['./rotating-phones.component.scss'],
})
export class RotatingPhonesComponent implements OnDestroy, AfterViewInit {
  private isAlive = true;
  private intervalId: number | undefined;
  private previousScreenshotIndex = 0;
  private activeScreenshotIndex = 1;

  @ViewChild('screenshot_container')
  screenShotContainer: ElementRef | undefined;

  constructor(private readonly renderer2: Renderer2) {}

  public ngAfterViewInit(): void {
    //  FIXME
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.intervalId = setInterval(() => this.animateScreenshots(), 6000);
  }

  public ngOnDestroy(): void {
    this.isAlive = false;

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
}
