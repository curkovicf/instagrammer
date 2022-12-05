import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-insta-logo',
  template: `
    <div [ngClass]="{ 'lg-margin': size === 'lg', 'sm-margin': size === 'sm' }" class="instagram-logo">
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
          @include center-flex-X();

          & > .sm {
            height: 2rem;
          }

          & > .lg {
            height: 6rem;
          }
        }

        & > .lg-margin {
          height: 6rem;
          margin-top: 2.1rem;
          margin-bottom: 0.8rem;
        }

        & > .sm-margin {
          height: 2rem;
          margin-top: 1.5rem;
          margin-bottom: 0.4rem;
        }
      }
    `,
  ],
})
export class LogoComponent {
  @Input() size: 'sm' | 'lg' = 'lg';
}
