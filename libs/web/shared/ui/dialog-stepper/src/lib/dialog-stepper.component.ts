import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ng-inst-dialog-stepper',
  templateUrl: './dialog-stepper.component.html',
  styleUrls: ['./dialog-stepper.component.scss'],
})
export class DialogStepperComponent {
  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

  @Output()
  public stepNext: EventEmitter<void> = new EventEmitter();

  @Output()
  public stepBack: EventEmitter<void> = new EventEmitter();
}
