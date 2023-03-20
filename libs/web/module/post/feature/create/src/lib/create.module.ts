import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { DialogStepperModule } from '@instagrammer/web/shared/ui/dialog-stepper';

@NgModule({
  imports: [CommonModule, DialogStepperModule],
  declarations: [CreateComponent],
  exports: [CreateComponent],
})
export class CreateModule {}
