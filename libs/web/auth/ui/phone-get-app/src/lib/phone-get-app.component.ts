import { Component } from '@angular/core';

@Component({
  selector: 'ng-insta-phone-get-app',
  template: `
    <section class="get-app">
      <p>Get the app.</p>
    </section>

    <section class="mobile-downloads">
      <img class="ios-image" src="/assets/images/download_ios.png" alt="download ios image" />
      <img
        class="android-image"
        src="/assets/images/download_android.png"
        alt="download android image"
      />
    </section>
  `,
  styleUrls: ['./phone-get-app.component.scss'],
})
export class PhoneGetAppComponent {}
