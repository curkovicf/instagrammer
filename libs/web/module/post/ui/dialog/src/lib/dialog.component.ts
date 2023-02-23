import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ng-inst-create-post-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Output()
  public closeDialog: EventEmitter<void> = new EventEmitter();

  @Output()
  public stepNext: EventEmitter<void> = new EventEmitter();

  @Output()
  public stepBack: EventEmitter<void> = new EventEmitter();
}
