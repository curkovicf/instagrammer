import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtaButtonComponent } from './cta-button.component';
import { AppleSpinnerModule } from '@instagrammer/web/shared/ui/apple-spinner';

@NgModule({
  imports: [CommonModule, AppleSpinnerModule],
  declarations: [CtaButtonComponent],
  exports: [CtaButtonComponent],
})
export class CtaButtonModule {}
