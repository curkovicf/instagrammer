import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ng-insta-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('inputElement')
  inputElement: ElementRef | undefined;

  @Input()
  initialValue: string | null = null;

  @Input()
  disabled = false;

  @Input()
  placeholder: string | null = null;

  @Input()
  inputType: 'text' | 'number' | 'password' = 'text';

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

  value = '';

  public isInputFocused = false;
  public isPasswordHidden = true;
  public isPasswordType = false;

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

  public ngOnInit(): void {
    if (this.inputType !== 'password') {
      return;
    }

    this.isPasswordType = true;
  }

  public ngAfterViewInit(): void {
    if (!this.initialValue) {
      return;
    }

    if (!this.inputElement) {
      throw new Error('Input element is not available in the @ViewChild()');
    }

    this.inputElement.nativeElement.value = this.initialValue;
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

  public onChange() {}

  public onTouched() {}

  onInputChange($event: Event) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.onChange($event.target.value);
  }

  public onFocusIn(): void {
    this.isInputFocused = true;
  }

  public onFocusOut(): void {
    this.isInputFocused = false;
  }

  public onShowOrHidePassword(): void {
    this.isPasswordHidden = !this.isPasswordHidden;

    if (this.inputType === 'password') {
      this.inputType = 'text';

      return;
    }

    this.inputType = 'password';
  }
}
