import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TextAreaComponent } from '@instagrammer/web/shared/ui/text-area';

@Component({
  selector: 'inst-s-text-area-rich',
  standalone: true,
  imports: [CommonModule, TextAreaComponent],
  templateUrl: './text-area-rich.component.html',
  styleUrls: ['./text-area-rich.component.scss'],
})
export class TextAreaRichComponent implements ControlValueAccessor {
  @Input()
  disabled = false;

  @Input()
  placeholder = '';

  @Input()
  username = 'insta_dev_acc';

  @Input()
  maxLetterCount = 200;

  @Input()
  rowHeight = 5;

  @Input()
  imageSrc = '/assets/images/no-profile-picture.svg';

  @Input()
  imageAlt = '';

  @Output()
  onchange: EventEmitter<string> = new EventEmitter();

  value = '';
  currentLetterCount = 0;

  constructor(
    // Retrieve the dependency only from the local injector,
    // not from parent or ancestors.
    @Self()
    // We want to be able to use the component without a form,
    // so we mark the dependency as optional.
    @Optional()
    private ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched(): void {}

  public onInputChange(value: string): void {
    this.onchange.emit(value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.onChange(value);
  }
}
