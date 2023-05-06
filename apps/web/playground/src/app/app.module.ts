import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { TextAreaComponent } from '@instagrammer/web/shared/ui/text-area';
import { TextAreaRichComponent } from '@instagrammer/web/shared/ui/text-area-rich';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), TextAreaComponent, TextAreaRichComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
