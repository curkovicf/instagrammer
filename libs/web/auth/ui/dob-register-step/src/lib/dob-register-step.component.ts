import { Component, EventEmitter, Output } from '@angular/core';

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

  //  URL: https://help.instagram.com/1558337079003881
}
