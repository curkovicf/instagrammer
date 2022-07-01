import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DatepickerComponent } from '@instagrammer/web/shared/ui/datepicker';

@Component({
  selector: 'ng-insta-dob-register-step',
  templateUrl: './dob-register-step.component.html',
  styleUrls: ['./dob-register-step.component.scss'],
})
export class DobRegisterStepComponent {
  @Output()
  next: EventEmitter<Date> = new EventEmitter();

  @Output()
  stepback: EventEmitter<void> = new EventEmitter();

  @ViewChild(DatepickerComponent)
  datepickerComponent!: DatepickerComponent;

  public isUnderAge = true;
  public isSpinnerActive = false;

  public onDobChange(selectedDob: Date): void {
    const underAgeLimitDate = new Date();

    underAgeLimitDate.setFullYear(underAgeLimitDate.getFullYear() - 13);

    if (underAgeLimitDate > selectedDob) {
      this.isUnderAge = false;

      return;
    }

    this.isUnderAge = true;
  }
}

//  URL: https://help.instagram.com/1558337079003881
