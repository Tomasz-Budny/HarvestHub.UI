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
        return '1 klasa';
      case SoilClass.Second:
        return '2 klasa';
      case SoilClass.Third:
        return '3 klasa';
      case SoilClass.Fourth:
          return '4 klasa';
      case SoilClass.Fifth:
            return '5 klasa';
      default:
        return 'Nieznane'
    }
  }

}
