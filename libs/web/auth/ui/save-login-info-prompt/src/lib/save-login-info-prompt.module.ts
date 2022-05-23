import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveLoginInfoPromptComponent } from './save-login-info-prompt.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';

@NgModule({
  imports: [CommonModule, CardModule, CtaButtonModule],
  declarations: [SaveLoginInfoPromptComponent],
  exports: [SaveLoginInfoPromptComponent],
})
export class SaveLoginInfoPromptModule {}
