import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarSmallComponent } from './toolbar-small.component';
import { WebModuleHomeDataAccessModule } from '@instagrammer/web/module/home/data';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';
import {
  AddPostIconComponent,
  HomeIconComponent,
  InstagramIconComponent,
  SearchIconComponent,
} from '@instagrammer/web/module/home/ui/svg-icon';

@NgModule({
  imports: [
    CommonModule,
    WebModuleHomeDataAccessModule,
    SmoothHoverModule,
    InstagramIconComponent,
    HomeIconComponent,
    SearchIconComponent,
    AddPostIconComponent,
  ],
  declarations: [ToolbarSmallComponent],
  exports: [ToolbarSmallComponent],
})
export class ToolbarSmallModule {}
