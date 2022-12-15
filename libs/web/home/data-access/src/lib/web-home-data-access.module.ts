import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewModel } from './viewmodel/home.viewmodel';
import { ToolbarViewModel } from './viewmodel/toolbar.viewmodel';

@NgModule({
  imports: [CommonModule],
  providers: [HomeViewModel, ToolbarViewModel],
})
export class WebHomeDataAccessModule {}
