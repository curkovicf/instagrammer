import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarItemComponent } from './toolbar-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToolbarItemComponent],
  exports: [ToolbarItemComponent],
})
export class ToolbarItemModule {}
