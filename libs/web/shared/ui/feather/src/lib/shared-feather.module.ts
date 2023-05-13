import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeft, Check, ChevronDown, MapPin } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  ArrowLeft,
  ChevronDown,
  Check,
  MapPin,
};

@NgModule({
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class SharedFeatherModule {}
