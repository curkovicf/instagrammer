import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { DialogStepperModule } from '@instagrammer/web/shared/ui/dialog-card';
import { ImageAddComponent } from '@instagrammer/web/module/post/ui/image-add';
import { StepWrapperComponent } from '@instagrammer/web/module/post/ui/step-wrapper';
import { ImageInfoComponent } from '@instagrammer/web/module/post/ui/image-info';

@NgModule({
  imports: [CommonModule, DialogStepperModule, ImageAddComponent, StepWrapperComponent, ImageInfoComponent],
  declarations: [CreateComponent],
  exports: [CreateComponent],
})
export class CreateModule {}
