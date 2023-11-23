import { Pipe, PipeTransform } from '@angular/core';
import { SoilClass } from '../data-model/soil-class.model';

@Pipe({
  name: 'soilClass',
  standalone: true
})
export class SoilClassPipe implements PipeTransform {

  transform(soilClass: SoilClass): string {
    switch(soilClass) {
      case SoilClass.Unknown:
        return 'Nieznana';
      case SoilClass.First:
        return 'Pierwsza klasa';
      case SoilClass.Second:
        return 'Druga klasa';
      case SoilClass.Third:
        return 'Trzecia klasa';
      case SoilClass.Fourth:
          return 'Czwarta klasa';
      case SoilClass.Fifth:
            return 'Piąta klasa';
      default:
        return 'Nieznane'
    }
  }

}
