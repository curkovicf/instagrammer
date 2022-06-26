import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WebShellModule } from '@instagrammer/web/shell/feature';
import { ENVIRONMENT_TOKEN, environmentDev } from '@instagrammer/web/shared/app-configs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WithCredentialsInterceptor } from '@instagrammer/web/auth/util';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellModule, HttpClientModule],
  bootstrap: [AppComponent],
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
})
export class AppModule {}
