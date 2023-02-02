import { Component, OnInit } from '@angular/core';
import { AuthService, JwtStorageService } from '@instagrammer/web/auth/data';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-inst-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private readonly jwtStorageService: JwtStorageService,
    private readonly authService: AuthService,
  ) {}

  public ngOnInit(): void {
    const isJwtValid = this.jwtStorageService.init();

    if (!isJwtValid) {
      setTimeout(() => this.authService.getAccessToken(), 1);
    }

    // if (isJwtValid) {
    //   const refreshJwtDto: RefreshJwtRequestDto = {
    //     username: this.jwtStorageService.getUsername(),
    //     isLongSession: true,
    //   };
    //
    //   this.authService.saveLogin(refreshJwtDto);
    // }
  }
}
