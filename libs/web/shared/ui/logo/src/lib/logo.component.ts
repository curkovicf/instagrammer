import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-insta-logo',
  template: `
    <div class="instagram-logo">
      <img [ngClass]="{ lg: size === 'lg', sm: size === 'sm' }" src="/assets/images/logo.png" alt="" />
    </div>
  `,
  styles: [
    `
      @import 'ng-instagrammer-colors';
      @import 'ng-instagrammer-fonts';
      @import 'ng-instagrammer-mixins';

      :host {
        display: block;

        & > .instagram-logo {
          height: 6rem;
          margin-top: 2.1rem;
          margin-bottom: 0.8rem;& > ng-insta-logo {}
          @include center-flex-X();

          & > .sm {
            height: 2rem;
          }

          & > .lg {
            height: 6rem;
          }
        }
      }
    `,
  ],
})
export class LogoComponent {
  @Input() size: 'sm' | 'lg' = 'lg';
}
