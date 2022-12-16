import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarSmallComponent } from './toolbar-small.component';
import { WebHomeDataAccessModule } from '@instagrammer/web/home/data-access';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';
import { InstagramIconComponent } from '@instagrammer/web/home/ui/svg-icon';

@NgModule({
  imports: [CommonModule, WebHomeDataAccessModule, SmoothHoverModule, InstagramIconComponent],
  declarations: [ToolbarSmallComponent],
  exports: [
    ToolbarSmallComponent,
  ],
})
export class ToolbarSmallModule {}
