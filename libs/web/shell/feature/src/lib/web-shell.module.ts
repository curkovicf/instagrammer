import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { shellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//  TODO: Reimpl
import { environmentDev } from '@instagrammer/web/shared/app-configs';
import { WebAuthDataAccessModule } from '@instagrammer/web/auth/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(shellRoutes),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    !environmentDev.production ? StoreDevtoolsModule.instrument() : [],
    WebAuthDataAccessModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebShellModule {}
