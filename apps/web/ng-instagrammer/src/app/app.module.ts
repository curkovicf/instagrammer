import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { WebShellModule } from '@instagrammer/web/shell/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
