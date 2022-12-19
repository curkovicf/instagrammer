import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { ToolbarItemModule } from '@instagrammer/web/home/ui/toolbar-item';
import { RouterLink } from '@angular/router';
import { WebHomeDataAccessModule } from '@instagrammer/web/home/data-access';
import { HomeIconComponent } from '@instagrammer/web/home/ui/svg-icon';

@NgModule({
  imports: [CommonModule, LogoModule, ToolbarItemModule, RouterLink, WebHomeDataAccessModule, HomeIconComponent],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
