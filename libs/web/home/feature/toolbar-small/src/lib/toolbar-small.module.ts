import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarSmallComponent } from './toolbar-small.component';
import { WebHomeDataAccessModule } from '@instagrammer/web/home/data-access';

@NgModule({
  imports: [CommonModule, WebHomeDataAccessModule],
  declarations: [ToolbarSmallComponent],
})
export class ToolbarSmallModule {}
