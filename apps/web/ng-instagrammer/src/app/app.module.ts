import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WebShellModule } from '@instagrammer/web/shell/feature';
import { ENVIRONMENT_TOKEN, environmentDev } from '@instagrammer/web/shared/app-configs';
import { HttpClientModule } from '@angular/common/http';

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
  ],
})
export class AppModule {}
