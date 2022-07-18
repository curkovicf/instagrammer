import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ng-insta-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('placeholderElement')
  placeholderElement: ElementRef | undefined;

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

  @Input()
  showValidityIcon = true;

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

  @Output()
  onenterkeypress: EventEmitter<void> = new EventEmitter();

  value = '';

  public isInputFocused = false;
  public isPasswordHidden = true;
  public isPasswordType = false;
  public isValid = false;
  public isTouched = false;
  public isShrunkProgrammatically = false;

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

  public ngOnInit(): void {
    if (this.inputType !== 'password') {
      return;
    }

    this.isPasswordType = true;
  }

  public ngAfterViewInit(): void {
    this.checkIfValid();

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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched() {}

  onInputChange($event: Event) {
    this.checkIfValid();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.onChange($event.target.value);
  }

  public onFocusIn(): void {
    this.isTouched = true;
    this.isInputFocused = true;
  }

  public onFocusOut(): void {
    this.isInputFocused = false;

    this.checkIfValid();
  }

  public onShowOrHidePassword(mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();

    this.isPasswordHidden = !this.isPasswordHidden;

    if (this.inputType === 'password') {
      this.inputType = 'text';

      return;
    }

    this.inputType = 'password';
  }

  private checkIfValid(): void {
    const invalid = this.elementRef.nativeElement.classList.contains('ng-invalid');

    if (invalid) {
      this.isValid = false;

      return;
    }

    this.isValid = true;
  }

  public onKeyDown($event: KeyboardEvent): void {
    if ($event.key !== 'Enter') {
      return;
    }

    $event.preventDefault();

    this.onenterkeypress.emit();
  }

  public markAsTouchedAndDirty(): void {
    this.renderer2.addClass(this.placeholderElement?.nativeElement, 'shrink-placeholder');
    this.renderer2.addClass(this.inputElement?.nativeElement, 'shrink-input');
  }
}
