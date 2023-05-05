import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routes';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { ReactiveFormsModule } from '@angular/forms';
import { OrBlockModule } from '@instagrammer/web/module/auth/ui/or-block';
import { PhoneGetAppModule } from '@instagrammer/web/module/auth/ui/phone-get-app';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { TextWithLinkInCardModule } from '@instagrammer/web/module/auth/ui/text-with-link-in-card';
import { LogInWithFacebookModule } from '@instagrammer/web/module/auth/ui/log-in-with-facebook';
import { RotatingPhonesModule } from '@instagrammer/web/module/auth/ui/rotating-phones';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    InputModule,
    CtaButtonModule,
    ReactiveFormsModule,
    OrBlockModule,
    PhoneGetAppModule,
    CardModule,
    TextWithLinkInCardModule,
    LogInWithFacebookModule,
    RotatingPhonesModule,
    LogoModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
