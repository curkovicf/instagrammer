import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { TextAreaComponent } from '@instagrammer/web/shared/ui/text-area';
import { TextAreaRichComponent } from '@instagrammer/web/shared/ui/text-area-rich';
import { CollapsableComponent } from '@instagrammer/web/shared/ui/collapsable';
import { SharedFeatherModule } from '@instagrammer/web/shared/ui/feather';
import { InputLocationComponent } from '@instagrammer/web/shared/ui/input-location';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TextAreaComponent,
    TextAreaRichComponent,
    CollapsableComponent,
    SharedFeatherModule,
    InputLocationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
