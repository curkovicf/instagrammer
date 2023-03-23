import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCardComponent } from './dialog-card.component';
import { ClosableOverlayComponent } from '@instagrammer/web/shared/ui/closable-overlay';

@NgModule({
  imports: [CommonModule, ClosableOverlayComponent],
  declarations: [DialogCardComponent],
  exports: [DialogCardComponent],
})
export class DialogStepperModule {}
