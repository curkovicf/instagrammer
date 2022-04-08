import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WebShellModule } from '@instagrammer/web/shell/feature';
import { ENVIRONMENT_TOKEN, EnvironmentService } from '@instagrammer/web/shared/app-configs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ENVIRONMENT_TOKEN,
      useClass: EnvironmentService,
    },
  ],
})
export class AppModule {}
