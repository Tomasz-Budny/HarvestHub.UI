import { AddressViewModel } from "./address.model";
import { CoordinatesViewModel } from "./coordinates.model";
import { OwnershipStatus } from "./ownership-status.model";
import { SoilClass } from "./soil-class.model";

export class FieldDetailsViewModel {
  constructor(
    public name: string,
    public center: CoordinatesViewModel,
    public createdAt: Date,
    public area: number,
    public fieldClass: SoilClass,
    public ownershipStatus: OwnershipStatus,
    public address: AddressViewModel,
    public color: string
  ) {}
}