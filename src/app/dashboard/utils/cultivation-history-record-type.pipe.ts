import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historyRecordType',
  standalone: true
})
export class CultivationHistoryRecordTypePipe implements PipeTransform {

  transform(historyRecordType: string): string {
    switch(historyRecordType) {
      case 'harvest':
        return 'Zbiory'
      case 'fertilization':
        return 'Nawożenie'
      default:
        return 'Nieznane'
    }
  }

}
