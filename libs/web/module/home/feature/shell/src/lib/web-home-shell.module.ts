import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { routes } from './web-home-shell.routes';
import { FeedModule } from '@instagrammer/web/module/home/feature/feed';
import { SuggestionsModule } from '@instagrammer/web/module/home/feature/suggestion';
import { ToolbarModule } from '@instagrammer/web/module/home/feature/toolbar';
import { StoryToolbarModule } from '@instagrammer/web/module/home/feature/story-toolbar';
import { ToolbarSmallModule } from '@instagrammer/web/module/home/feature/toolbar-small';
import { StickySidenavContentBoxComponent } from '@instagrammer/web/module/home/ui/sticky-sidenav-content-box';
import { CreateModule } from '@instagrammer/web/module/post/feature/create';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    SuggestionsModule,
    ToolbarModule,
    StoryToolbarModule,
    ToolbarSmallModule,
    StickySidenavContentBoxComponent,
    CreateModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebHomeShellModule {}
