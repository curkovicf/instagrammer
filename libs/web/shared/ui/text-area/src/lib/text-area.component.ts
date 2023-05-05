/* eslint-disable @typescript-eslint/no-empty-function */

import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ng-inst-text-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements ControlValueAccessor {
  @ViewChild('placeholderElement')
  placeholderElement: ElementRef | undefined;

  @ViewChild('inputElement')
  inputElement: ElementRef | undefined;

  @Input()
  disabled = false;

  @Input()
  placeholder?: string;

  @Input()
  maxLetterCount = 200;

  @Input()
  showLetterCount = true;

  @Input()
  @HostBinding('style.height.rem')
  rowHeight = 5;

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

  @Output()
  onenterkeypress: EventEmitter<void> = new EventEmitter();

  @Output()
  onlettercountupdate: EventEmitter<{ current: number; max: number }> = new EventEmitter();

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
    private elementRef: ElementRef,
    private readonly renderer2: Renderer2,
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
  public onChange() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched() {}

  onInputChange($event: Event, currentLetterCount: number) {
    this.currentLetterCount = currentLetterCount;
    this.onlettercountupdate.emit({ current: this.currentLetterCount, max: this.maxLetterCount });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.onChange($event.target.value);
  }

  public onKeyDown($event: KeyboardEvent): void {
    if ($event.key !== 'Enter') {
      return;
    }

    $event.preventDefault();

    this.onenterkeypress.emit();
  }
}
