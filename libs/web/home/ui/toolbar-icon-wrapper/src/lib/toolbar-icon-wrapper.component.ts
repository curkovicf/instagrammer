import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-inst-toolbar-icon-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar-icon-wrapper.component.html',
  styleUrls: ['./toolbar-icon-wrapper.component.scss'],
})
export class ToolbarIconWrapperComponent {
  @Input()
  public title = '';
}
