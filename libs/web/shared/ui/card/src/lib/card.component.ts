import { Component } from '@angular/core';

@Component({
  selector: 'ng-insta-card',
  template: `<ng-content select=".card-content"></ng-content>`,
  styles: [
    `
      @import 'ng-instagrammer-colors';
      @import 'ng-instagrammer-fonts';
      @import 'ng-instagrammer-mixins';

      :host {
        display: block;
        background-color: #ffffff;
        border: 1px solid #dbdbdb;
        @include box-max();
        @include center-flex-X();
      }
    `,
  ],
})
export class CardComponent {}
