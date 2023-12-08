import { Pipe, PipeTransform } from '@angular/core';
import { FertilizerType } from '../data-model/fertilizer-type.model';

@Pipe({
  name: 'fertilizerType',
  standalone: true
})
export class FertilizerTypePipe implements PipeTransform {

  transform(fertilizerType: FertilizerType): string {
    switch(fertilizerType) {
      case FertilizerType.Compost:
        return 'kompost';
      case FertilizerType.Manure:
        return 'gnojowica';
      case FertilizerType.AmmoniumNitrate:
        return 'saletra amonowa';
      case FertilizerType.Nitrogen:
          return 'azot';
      case FertilizerType.Phosphates:
          return 'fosforan';
      case FertilizerType.Potassium:
          return 'potas';
      default:
        return 'Nieznanego'
    }
  }

}
