import { OwnershipStatus } from "../data-model/ownership-status.model";

export class OwnerShipStatusUtil {
  static getAllOwnerShipStatuses(): OwnershipStatus[] {
    return <OwnershipStatus[]>Object.values(OwnershipStatus).filter(ownershipStatus => !isNaN(Number(ownershipStatus)));
  }
}