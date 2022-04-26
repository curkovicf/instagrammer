import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DontHaveAccountComponent } from './dont-have-account.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, CardModule, RouterModule],
  declarations: [DontHaveAccountComponent],
  exports: [DontHaveAccountComponent],
})
export class DontHaveAccountModule {}
