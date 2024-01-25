import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { PostCardComponent } from 'web/module/post/ui/post-card';

@NgModule({
  imports: [CommonModule, PostCardComponent],
  declarations: [FeedComponent],
  exports: [FeedComponent],
})
export class FeedModule {}
