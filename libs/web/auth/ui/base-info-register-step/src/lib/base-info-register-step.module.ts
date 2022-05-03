import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseInfoRegisterStepComponent } from './base-info-register-step.component';
import { LogoModule } from '@instagrammer/web/auth/ui/logo';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { OrBlockModule } from '@instagrammer/web/auth/ui/or-block';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, LogoModule, CardModule, CtaButtonModule, OrBlockModule, InputModule, ReactiveFormsModule],
  declarations: [BaseInfoRegisterStepComponent],
  exports: [BaseInfoRegisterStepComponent],
})
export class BaseInfoRegisterStepModule {}
