import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHoverDirective } from './smooth-hover.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SmoothHoverDirective],
  exports: [SmoothHoverDirective],
})
export class SmoothHoverModule {}
