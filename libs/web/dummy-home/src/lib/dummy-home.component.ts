import { Component } from '@angular/core';
import { AuthService } from '@instagrammer/web/auth/data-access';

@Component({
  selector: 'instagrammer-dummy-home',
  templateUrl: './dummy-home.component.html',
  styleUrls: ['./dummy-home.component.scss'],
})
export class DummyHomeComponent {
  constructor(private readonly authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }
}
