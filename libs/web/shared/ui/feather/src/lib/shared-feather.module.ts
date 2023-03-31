import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeft } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  ArrowLeft,
};

@NgModule({
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class SharedFeatherModule {}
