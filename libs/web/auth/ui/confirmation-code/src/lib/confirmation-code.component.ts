import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-insta-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['./confirmation-code.component.scss'],
})
export class ConfirmationCodeComponent implements OnInit {
  @Input()
  email!: string | null;

  @Output()
  next: EventEmitter<number> = new EventEmitter();

  @Output()
  stepback: EventEmitter<void> = new EventEmitter();

  @Output()
  resendcode: EventEmitter<void> = new EventEmitter();

  public ngOnInit(): void {
    if (!this.email) {
      throw new Error('Email has to be provided in the "confirmation-code component"');
    }
  }
}
