import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebModuleShellModule } from '@instagrammer/web/module/shell';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebModuleShellModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
