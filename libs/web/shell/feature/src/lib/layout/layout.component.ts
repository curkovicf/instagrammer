import { Component, OnInit } from '@angular/core';
import { JwtStorageService } from '@instagrammer/web/auth/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-inst-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private readonly jwtStorageService: JwtStorageService) {}

  public ngOnInit(): void {
    this.jwtStorageService.init();
  }
}
