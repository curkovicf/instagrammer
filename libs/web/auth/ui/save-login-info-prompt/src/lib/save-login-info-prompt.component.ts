import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'instagrammer-save-login-info-prompt',
  templateUrl: './save-login-info-prompt.component.html',
  styleUrls: ['./save-login-info-prompt.component.scss'],
})
export class SaveLoginInfoPromptComponent {
  @Output()
  saveinfo: EventEmitter<void> = new EventEmitter();

  @Output()
  skipsaveinfo: EventEmitter<void> = new EventEmitter();
}
