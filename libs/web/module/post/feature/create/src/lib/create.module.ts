import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { DialogStepperModule } from '@instagrammer/web/shared/ui/dialog-stepper';
import { AddPhotoComponent } from '@instagrammer/web/module/post/ui/add-photo';

@NgModule({
  imports: [CommonModule, DialogStepperModule, AddPhotoComponent],
  declarations: [CreateComponent],
  exports: [CreateComponent],
})
export class CreateModule {}
