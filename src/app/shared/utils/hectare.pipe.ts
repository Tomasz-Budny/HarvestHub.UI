import { Pipe, PipeTransform } from '@angular/core';
import { HectaresUtils } from './hectare.util';

@Pipe({
  name: 'hectare',
  standalone: true
})
export class HectarePipe implements PipeTransform {

  transform(squareMeters: number): string {
    const hectares = HectaresUtils.ConvertToHectares(squareMeters).toFixed(2);

    return hectares + ' ha';
  }

}
