import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-insta-closable-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './closable-overlay.component.html',
  styleUrls: ['./closable-overlay.component.scss'],
})
export class ClosableOverlayComponent {
  @Output()
  public closeOverlay: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  public onClick() {
    this.closeOverlay.emit();
  }
}
