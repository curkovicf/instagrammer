import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { registerRoutes } from './register.routes';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { LogoModule } from '@instagrammer/web/auth/ui/logo';
import { OrBlockModule } from '@instagrammer/web/auth/ui/or-block';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { PhoneGetAppModule } from '@instagrammer/web/auth/ui/phone-get-app';
import { TextWithLinkInCardModule } from '@instagrammer/web/auth/ui/dont-have-account';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(registerRoutes), CardModule, LogoModule, OrBlockModule, InputModule, CtaButtonModule, PhoneGetAppModule, TextWithLinkInCardModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule {}
