import { Component } from '@angular/core';
import { AuthService, JwtStorageService } from '@instagrammer/web/auth/data';
import { Router } from '@angular/router';
import { UserApi } from '@instagrammer/shared/data/api';

@Component({
  selector: 'ng-insta-save-login-info-prompt',
  templateUrl: './save-login-info.component.html',
  styleUrls: ['./save-login-info.component.scss'],
})
export class SaveLoginInfoComponent {
  public isSpinnerActive = false;

  constructor(
    public readonly authService: AuthService,
    public readonly router: Router,
    private readonly jwtStorageService: JwtStorageService,
  ) {}

  public onSaveInfoClick(): void {
    this.isSpinnerActive = true;

    setTimeout(() => {
      const refreshJwtDto: UserApi.RefreshJwtRequestDto = {
        usernameOrEmail: this.jwtStorageService.getUsername(),
        isLongSession: true,
      };

      this.authService.saveLogin(refreshJwtDto);
    }, 2000);
  }
}
