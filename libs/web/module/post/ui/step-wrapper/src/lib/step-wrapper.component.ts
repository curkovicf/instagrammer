import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'ng-inst-step-wrapper',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './step-wrapper.component.html',
  styleUrls: ['./step-wrapper.component.scss'],
})
export class StepWrapperComponent {
  @Input()
  public title = '';

  @Input()
  public stepNextTitle = '';

  @Input()
  public canStepBack = false;

  @Input()
  public canStepNext = false;

  @Input()
  public hasSideBar = false;

  @Output()
  public stepNext: EventEmitter<void> = new EventEmitter();

  @Output()
  public stepBack: EventEmitter<void> = new EventEmitter();
}
