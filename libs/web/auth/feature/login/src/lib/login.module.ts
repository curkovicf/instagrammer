import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routes';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { ReactiveFormsModule } from '@angular/forms';
import { OrBlockModule } from '@instagrammer/web/auth/ui/or-block';
import { PhoneGetAppModule } from '@instagrammer/web/auth/ui/phone-get-app';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { DontHaveAccountModule } from '@instagrammer/web/auth/ui/dont-have-account';
import { LogInWithFacebookModule } from '@instagrammer/web/auth/ui/log-in-with-facebook';
import { RotatingPhonesModule } from '@instagrammer/web/auth/ui/rotating-phones';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(loginRoutes), InputModule, CtaButtonModule, ReactiveFormsModule, OrBlockModule, PhoneGetAppModule, CardModule, DontHaveAccountModule, LogInWithFacebookModule, RotatingPhonesModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
