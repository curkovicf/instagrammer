import { Component } from '@angular/core';
import { AuthService } from '@instagrammer/web/auth/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'ng-inst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  public login(username: string, password: string): void {
    this.authService
      .login({ username, password })
      .pipe(take(1))
      .subscribe(result => console.log('Result ', result));
  }
}
