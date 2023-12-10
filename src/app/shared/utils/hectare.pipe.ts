import { Pipe, PipeTransform } from '@angular/core';
import { HectaresUtils } from './hectare.util';

@Pipe({
  name: 'hectare',
  standalone: true
})
export class HectarePipe implements PipeTransform {

  transform(squareMeters: number, decimalNumber: number = 2): string {
    const hectares = HectaresUtils.ConvertToHectares(squareMeters).toFixed(decimalNumber);

    return hectares + ' ha';
  }

}
