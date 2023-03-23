import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { DialogStepperModule } from '@instagrammer/web/shared/ui/dialog-card';
import { AddPhotoComponent } from '@instagrammer/web/module/post/ui/add-photo';
import { StepWrapperComponent } from '@instagrammer/web/module/post/ui/step-wrapper';

@NgModule({
  imports: [CommonModule, DialogStepperModule, AddPhotoComponent, StepWrapperComponent],
  declarations: [CreateComponent],
  exports: [CreateComponent],
})
export class CreateModule {}
