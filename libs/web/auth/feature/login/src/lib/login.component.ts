import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '@instagrammer/web/auth/data-access';

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
