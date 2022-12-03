import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { routes } from './web-home-shell.routes';
import { FeedModule } from '@instagrammer/web/home/feature/feed';
import { SuggestionsModule } from '@instagrammer/web/home/feature/suggestions';
import { ToolbarModule } from '@instagrammer/web/home/feature/toolbar';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule, SuggestionsModule, ToolbarModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebHomeShellModule {}
