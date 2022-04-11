import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
  },
  {
    path: 'login',
    // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
    loadChildren: async () => (await import('@instagrammer/web/auth/feature/login')).LoginModule,
  },
  {
    path: 'register',
    // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
    loadChildren: async () => (await import('@instagrammer/web/auth/feature/register')).RegisterModule,
  },
];
