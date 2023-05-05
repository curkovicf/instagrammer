import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarViewModel } from './viewmodel/toolbar.viewmodel';

@NgModule({
  imports: [CommonModule],
  providers: [ToolbarViewModel],
})
export class WebModuleHomeDataAccessModule {}
