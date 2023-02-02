import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { LogoModule } from '@instagrammer/web/shared/ui/logo';
import { RouterLink } from '@angular/router';
import { WebHomeDataAccessModule } from '@instagrammer/web/home/data';
import { HomeIconComponent, SearchIconComponent } from '@instagrammer/web/home/ui/svg-icon';

@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    RouterLink,
    WebHomeDataAccessModule,
    HomeIconComponent,
    SearchIconComponent,
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
