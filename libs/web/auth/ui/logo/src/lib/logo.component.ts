import { Component } from '@angular/core';

@Component({
  selector: 'ng-insta-logo',
  template: `
    <div class="instagram-logo">
      <img src="/assets/images/logo.png" alt="" />
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
          margin-bottom: 0.8rem;
          @include center-flex-X();
        }
      }
    `,
  ],
})
export class LogoComponent {}
