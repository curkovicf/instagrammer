import { Component, OnInit } from '@angular/core';
import { AuthService } from '@instagrammer/web/module/auth/data';

@Component({
  selector: 'ng-inst-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.authenticateTokens();
  }
}
