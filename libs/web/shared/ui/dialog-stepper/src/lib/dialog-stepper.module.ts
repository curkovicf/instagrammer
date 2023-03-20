import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogStepperComponent } from './dialog-stepper.component';
import { ClosableOverlayComponent } from '@instagrammer/web/shared/ui/closable-overlay';

@NgModule({
  imports: [CommonModule, ClosableOverlayComponent],
  declarations: [DialogStepperComponent],
  exports: [DialogStepperComponent],
})
export class DialogStepperModule {}
