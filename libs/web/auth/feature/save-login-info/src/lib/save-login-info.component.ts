import { Component } from '@angular/core';
import { AuthService } from '@instagrammer/web/auth/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-insta-save-login-info-prompt',
  templateUrl: './save-login-info.component.html',
  styleUrls: ['./save-login-info.component.scss'],
})
export class SaveLoginInfoComponent {
  constructor(public readonly authService: AuthService, public readonly router: Router) {}
}
