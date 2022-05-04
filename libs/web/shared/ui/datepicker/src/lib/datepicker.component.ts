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
  public selectedDay: number;
  public selectedYear: number;

  constructor() {
    const today = new Date();

    this.selectedYear = today.getFullYear();
    this.selectedMonth = `${today.getMonth()}`;
    this.selectedDay = today.getDate();

    this.initYears();
    this.initMonths();
    this.initDays(today);
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

  private initDays(date: Date): void {
    this.days.length = 0;

    const daysInMonthCount = this.daysInMonth(date.getMonth() + 1, date.getFullYear());

    for (let index = 1; index < daysInMonthCount + 1; index++) {
      this.days.push(index);
    }
  }

  private daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  public onMonthChange(monthIndex: number): void {
    const date = new Date();

    date.setMonth(monthIndex);
    date.setFullYear(this.selectedYear);

    this.initDays(date);
  }

  public onYearChange(year: string): void {
    console.log('YAR ', year);
    const date = new Date();

    date.setMonth(monthIndex);
    date.setFullYear(Number(year));

    this.initDays(date);
  }
}
