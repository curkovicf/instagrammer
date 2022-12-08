import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { ToolbarItemModule } from '@instagrammer/web/home/ui/toolbar-item';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [CommonModule, LogoModule, ToolbarItemModule, RouterLink],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
