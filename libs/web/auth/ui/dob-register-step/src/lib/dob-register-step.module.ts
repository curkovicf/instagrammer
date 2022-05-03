import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DobRegisterStepComponent } from './dob-register-step.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [DobRegisterStepComponent],
  exports: [DobRegisterStepComponent],
})
export class DobRegisterStepModule {}
