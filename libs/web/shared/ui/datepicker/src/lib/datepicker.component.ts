import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ng-insta-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  @Output()
  datechange: EventEmitter<Date> = new EventEmitter();

  public months: string[] = [];
  public days: number[] = [];
  public years: number[] = [];

  private selectedMonth: string;
  private selectedMonthIndex: number;
  private selectedDay: number;
  private selectedYear: number;

  constructor() {
    const today = new Date();

    this.selectedYear = today.getFullYear();
    this.selectedMonth = `${today.getMonth()}`;
    this.selectedMonthIndex = 0;
    this.selectedDay = today.getDate();

    this.initYears();
    this.initMonths();
    this.initDays();
  }

  private initYears(): void {
    for (let index = 0; index < 104; index++) {
      this.years.push(this.selectedYear - index);
    }
  }

  private initMonths(): void {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  private initDays(): void {
    this.days.length = 0;
    const daysInMonthCount = new Date(this.selectedYear, this.selectedMonthIndex + 1, 0).getDate();

    for (let index = 1; index < daysInMonthCount + 1; index++) {
      this.days.push(index);
    }
  }

  public onUpdateDays(dayIndex: number): void {
    this.selectedDay = ++dayIndex;

    this.datechange.emit(this.getCurrentDob());
  }

  public onUpdateMonths(monthIndex: number): void {
    this.selectedMonthIndex = monthIndex;
    this.selectedMonth = this.months[monthIndex];
    this.initDays();

    this.datechange.emit(this.getCurrentDob());
  }

  public onUpdateYears(year: string): void {
    this.selectedYear = +year;
    this.initDays();

    this.datechange.emit(this.getCurrentDob());
  }

  public getCurrentDob(): Date {
    return new Date(this.selectedYear, this.selectedMonthIndex, this.selectedDay);
  }
}
