import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { shellRoutes } from './web-shell.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebAuthDataAccessModule } from '@instagrammer/web/auth/data-access';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ENVIRONMENT_TOKEN, environmentDev } from '@instagrammer/web/core/environment';
import { WithCredentialsInterceptor } from '@instagrammer/web/core/middleware';

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
  ],
  exports: [LayoutComponent],
})
export class WebShellModule {}
