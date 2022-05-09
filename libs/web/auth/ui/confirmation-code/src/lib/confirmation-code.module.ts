import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationCodeComponent } from './confirmation-code.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';

@NgModule({
  imports: [CommonModule, CardModule, InputModule, CtaButtonModule],
  declarations: [ConfirmationCodeComponent],
  exports: [ConfirmationCodeComponent],
})
export class ConfirmationCodeModule {}
