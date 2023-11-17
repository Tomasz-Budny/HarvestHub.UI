import { AddressViewModel } from "./address.model";
import { CoordinatesViewModel } from "./coordinates.model";

export class StartLocation {
  constructor(
    public coordinates: CoordinatesViewModel,
    public address: AddressViewModel
  ) {}
}