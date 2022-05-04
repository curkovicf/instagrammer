import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ng-insta-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {}
