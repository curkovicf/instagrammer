import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { routes } from './web-home-shell.routes';
import { FeedModule } from '@instagrammer/web/home/feature/feed';
import { SuggestionsModule } from '@instagrammer/web/home/feature/suggestions';
import { ToolbarModule } from '@instagrammer/web/home/feature/toolbar';
import { StoryToolbarModule } from '@instagrammer/web/home/feature/story-toolbar';
import { ToolbarSmallModule } from '@instagrammer/web/home/feature/toolbar-small';
import { StickySidenavContentBoxComponent } from '@instagrammer/web/home/ui/sticky-sidenav-content-box';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule, SuggestionsModule, ToolbarModule, StoryToolbarModule, ToolbarSmallModule, StickySidenavContentBoxComponent],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebHomeShellModule {}
