import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ng-inst-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss'],
})
export class DialogCardComponent {
  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();
}
