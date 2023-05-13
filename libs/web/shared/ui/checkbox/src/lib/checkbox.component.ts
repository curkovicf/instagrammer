// SOURCE
// https://stackblitz.com/edit/angular-custom-checkbox-component?file=src%2Fapp%2Fcustom-checkbox%2Fcustom-checkbox.component.html

import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'inst-s-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  public checked = false;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Step 4: Define what should happen in this component, if something changes outside
  public writeValue(checked: boolean) {
    this.checked = checked;
  }

  public onModelChange(e: boolean) {
    // Step 5a: bind the changes to the local value
    this.checked = e;

    // Step 5b: Handle what should happen on the outside, if something changes on the inside
    this.onChange(e);
  }
}
