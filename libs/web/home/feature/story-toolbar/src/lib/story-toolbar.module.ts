import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryToolbarComponent } from './story-toolbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StoryToolbarComponent],
  exports: [
    StoryToolbarComponent,
  ],
})
export class StoryToolbarModule {}
