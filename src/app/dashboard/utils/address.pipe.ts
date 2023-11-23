import { Pipe, PipeTransform } from '@angular/core';
import { AddressViewModel } from '../data-model/address.model';

@Pipe({
  name: 'address',
  standalone: true
})
export class AddressPipe implements PipeTransform {

  transform(address: AddressViewModel): string {
    let result = ''
    result = result.concat(`${address.country}, `)
    if(address.administrativeDivisionLevelOne) {
      result = result.concat(`${address.administrativeDivisionLevelOne}, `)
    }
    if(address.administrativeDivisionLevelTwo) {
      result = result.concat(`${address.administrativeDivisionLevelTwo}, `)
    }

    result = result.concat(address.city)

    return result;
  }

}
