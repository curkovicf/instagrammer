import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { registerRoutes } from './register.routes';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { OrBlockModule } from '@instagrammer/web/module/auth/ui/or-block';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { PhoneGetAppModule } from '@instagrammer/web/module/auth/ui/phone-get-app';
import { TextWithLinkInCardModule } from '@instagrammer/web/module/auth/ui/text-with-link-in-card';
import { ReactiveFormsModule } from '@angular/forms';
import { DobRegisterStepModule } from '@instagrammer/web/module/auth/ui/dob-register-step';
import { BaseInfoRegisterStepModule } from '@instagrammer/web/module/auth/ui/base-info-register-step';
import { DatepickerModule } from '@instagrammer/web/shared/ui/datepicker';
import { ConfirmationCodeModule } from '@instagrammer/web/module/auth/ui/confirmation-code';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes),
    CardModule,
    LogoModule,
    OrBlockModule,
    InputModule,
    CtaButtonModule,
    PhoneGetAppModule,
    TextWithLinkInCardModule,
    ReactiveFormsModule,
    DobRegisterStepModule,
    BaseInfoRegisterStepModule,
    DatepickerModule,
    ConfirmationCodeModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule {}
