import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { shellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebModuleAuthDataAccessModule } from '@instagrammer/web/module/auth/data';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ENVIRONMENT_TOKEN, environmentDev } from '@instagrammer/web/core/env';
import { WithCredentialsInterceptor } from '@instagrammer/web/core/middleware';
import { SharedFeatherModule } from '@instagrammer/web/shared/ui/feather';
import { SignInViaRefreshTokenInterceptor } from '@instagrammer/web/module/auth/middleware';

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
    WebModuleAuthDataAccessModule,
    SharedFeatherModule,
  ],
  declarations: [LayoutComponent],
  providers: [
    {
      //  TODO: Reimpl with file replacements
      provide: ENVIRONMENT_TOKEN,
      useValue: environmentDev,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SignInViaRefreshTokenInterceptor,
      multi: true,
    },
  ],
  exports: [LayoutComponent],
})
export class WebModuleShellModule {}
