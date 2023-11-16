import { Pipe, PipeTransform } from '@angular/core';
import { WeekDay } from '../data-model/week-day.model';

@Pipe({
  name: 'weekDay',
  standalone: true
})
export class WeekDayPipe implements PipeTransform {

  transform(weekDay: WeekDay): string {
    switch(weekDay) {
      case WeekDay.Monday:
        return 'PON';
      case WeekDay.Tuesday:
        return 'WTO';
      case WeekDay.Wednesday:
        return "ŚRO";
      case WeekDay.Thursday:
        return 'CZW';
      case WeekDay.Friday:
        return 'PIĄ';
      case WeekDay.Saturday:
        return 'SOB';
      case WeekDay.Sunday:
        return 'NIE';
      default:
        return '-|-'
    }
  }

}
