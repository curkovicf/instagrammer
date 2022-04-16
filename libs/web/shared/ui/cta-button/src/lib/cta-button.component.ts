import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-inst-cta-button',
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.scss'],
})
export class CtaButtonComponent implements OnInit {
  @Input()
  title!: string;

  @Input()
  isSpinnerActive = false;

  @Output()
  ctaclick: EventEmitter<void> = new EventEmitter();

  public ngOnInit(): void {
    if (!this.title) {
      throw new Error('Error: cta-button has to have a title.');
    }
  }
}
