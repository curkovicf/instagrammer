import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@instagrammer/web/shared/ui/input';
import { ControlValueAccessor } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'inst-s-input-location',
  standalone: true,
  imports: [CommonModule, InputModule, FeatherModule],
  templateUrl: './input-location.component.html',
  styleUrls: ['./input-location.component.scss'],
})
export class InputLocationComponent implements ControlValueAccessor {
  public placeholder = 'Add location';

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}

  onInput($event: Event, value: string) {}
}
