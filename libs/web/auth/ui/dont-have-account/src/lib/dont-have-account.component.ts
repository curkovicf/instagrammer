import { Component } from '@angular/core';

@Component({
  selector: 'ng-insta-dont-have-account',
  template: `
    <ng-insta-card>
      <div class="card-content text-wrapper">
        <p class="regular-text">Don't have an account?</p>
        <a href="">Sign up</a>
      </div>
    </ng-insta-card>
  `,
  styleUrls: ['./dont-have-account.component.scss'],
})
export class DontHaveAccountComponent {}
