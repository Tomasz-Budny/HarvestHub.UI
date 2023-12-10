import { Pipe, PipeTransform } from '@angular/core';
import { CropType } from '../data-model/crop-type.model';

@Pipe({
  name: 'cropType',
  standalone: true
})
export class CropTypePipe implements PipeTransform {

  transform(cropType: CropType): string {
    switch(cropType) {
      case CropType.Wheat:
        return 'pszenica';
      case CropType.Barley:
        return 'jęczmień';
      case CropType.Oat:
        return 'owies';
      case CropType.Rye:
          return 'żyto';
      case CropType.Corn:
          return 'kukurydza';
      case CropType.Rapeseed:
          return 'rzepak';
      case CropType.Triticale:
          return 'pszenżyto';
      default:
        return 'Nieznane'
    }
  }

}
