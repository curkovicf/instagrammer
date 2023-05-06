import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DobRegisterStepComponent } from './dob-register-step.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { DatepickerModule } from '@instagrammer/web/shared/ui/datepicker';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';

@NgModule({
  imports: [CommonModule, CardModule, DatepickerModule, CtaButtonModule],
  declarations: [DobRegisterStepComponent],
  exports: [DobRegisterStepComponent],
})
export class DobRegisterStepModule {}
