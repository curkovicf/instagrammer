import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DontHaveAccountComponent } from './dont-have-account.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [DontHaveAccountComponent],
  exports: [DontHaveAccountComponent],
})
export class DontHaveAccountModule {}
