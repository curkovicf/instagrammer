import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewModel } from './viewmodel/home.viewmodel';

@NgModule({
  imports: [CommonModule],
  providers: [HomeViewModel],
})
export class WebHomeDataAccessModule {}
