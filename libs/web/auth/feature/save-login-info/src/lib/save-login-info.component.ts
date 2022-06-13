import { Component } from '@angular/core';
import { AuthService, JwtStorageService } from '@instagrammer/web/auth/data-access';
import { Router } from '@angular/router';
import { RefreshJwtDto } from '@instagrammer/api/auth/data-access';

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
      const refreshJwtDto: RefreshJwtDto = {
        username: this.jwtStorageService.getUsername(),
        isLongSession: true,
      };

      this.authService.saveLogin(refreshJwtDto);
    }, 2000);
  }
}
