import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { ToolbarItemModule } from '@instagrammer/web/home/ui/toolbar-item';

@NgModule({
  imports: [CommonModule, LogoModule, ToolbarItemModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
