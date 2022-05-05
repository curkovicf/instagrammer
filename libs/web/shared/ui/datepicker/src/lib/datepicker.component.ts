import { ChangeDetectionStrategy, Component } from '@angular/core';

export enum Months {
  january = 'January',
  february = 'February',
  march = 'March',
  april = 'April',
  may = 'May',
  june = 'June',
  july = 'July',
  august = 'August',
  september = 'September',
  october = 'October',
  november = 'November',
  december = 'December',
}

@Component({
  selector: 'ng-insta-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  public months: string[] = [];
  public days: number[] = [];
  public years: number[] = [];

  public selectedMonth: string;
  public selectedMonthIndex: number;
  public selectedDay: number;
  public selectedYear: number;

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

  public updateDays(dayIndex: number): void {
    this.selectedDay = ++dayIndex;
    this.initDays();
  }

  public updateMonths(monthIndex: number): void {
    this.selectedMonthIndex = monthIndex;
    this.selectedMonth = this.months[monthIndex];
    this.initDays();
  }

  public updateYears(year: string): void {
    this.selectedYear = +year;
    this.initDays();
  }
}
