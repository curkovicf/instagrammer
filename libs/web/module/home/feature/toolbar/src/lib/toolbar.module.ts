import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { RouterLink } from '@angular/router';
import { WebModuleHomeDataAccessModule } from '@instagrammer/web/module/home/data';
import {
  AddPostIconComponent,
  HomeIconComponent,
  SearchIconComponent,
} from '@instagrammer/web/module/home/ui/svg-icon';

@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    RouterLink,
    WebModuleHomeDataAccessModule,
    HomeIconComponent,
    SearchIconComponent,
    AddPostIconComponent,
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
