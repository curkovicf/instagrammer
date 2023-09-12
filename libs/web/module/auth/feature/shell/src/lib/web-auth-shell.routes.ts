import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        // eslint-disable-next-line @nx/enforce-module-boundaries
        loadChildren: async () => (await import('@instagrammer/web/module/auth/feature/login')).LoginModule,
      },
      {
        path: 'register',
        // eslint-disable-next-line @nx/enforce-module-boundaries
        loadChildren: async () =>
          (await import('@instagrammer/web/module/auth/feature/register')).RegisterModule,
      },
      {
        path: 'onetap',
        // eslint-disable-next-line @nx/enforce-module-boundaries
        loadChildren: async () =>
          (await import('@instagrammer/web/module/auth/feature/save-login-info')).SaveLoginInfoModule,
      },
    ],
  },
];
