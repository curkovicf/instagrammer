import { Routes } from '@angular/router';
import { SaveLoginInfoComponent } from './save-login-info.component';
import { OneTapGuard } from '@instagrammer/web/auth/middleware';

export const saveLoginInfoRoutes: Routes = [
  {
    path: '',
    component: SaveLoginInfoComponent,
    canActivate: [OneTapGuard],
  },
];
