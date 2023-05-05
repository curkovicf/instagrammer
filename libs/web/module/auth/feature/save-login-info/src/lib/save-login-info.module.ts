import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveLoginInfoComponent } from './save-login-info.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';
import { RouterModule } from '@angular/router';
import { saveLoginInfoRoutes } from './save-login-info.routes';

@NgModule({
  imports: [CommonModule, CardModule, CtaButtonModule, RouterModule.forChild(saveLoginInfoRoutes)],
  declarations: [SaveLoginInfoComponent],
  exports: [SaveLoginInfoComponent],
})
export class SaveLoginInfoModule {}
