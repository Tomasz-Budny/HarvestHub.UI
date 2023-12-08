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
        return 'przenicy';
      case CropType.Barley:
        return 'jęczmienia';
      case CropType.Oat:
        return 'owsu';
      case CropType.Rye:
          return 'żyta';
      case CropType.Corn:
          return 'kukurydzy';
      case CropType.Rapeseed:
          return 'rzepaku';
      case CropType.Triticale:
          return 'przenżyta';
      default:
        return 'Nieznanego'
    }
  }

}
