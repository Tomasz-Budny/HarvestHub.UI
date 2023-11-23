import { Pipe, PipeTransform } from '@angular/core';
import { OwnershipStatus } from '../data-model/ownership-status.model';

@Pipe({
  name: 'ownershipStatus',
  standalone: true
})
export class OwnershipStatusPipe implements PipeTransform {

  transform(ownershipStatus: OwnershipStatus): string {
    switch(ownershipStatus) {
      case OwnershipStatus.Possesion:
        return 'Własność';
      case OwnershipStatus.Lease:
        return 'Dzierżawa';
      default:
        return 'Nieznane'
    }
  }

}
