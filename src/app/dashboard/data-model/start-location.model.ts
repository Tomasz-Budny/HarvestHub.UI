import { AddressViewModel } from "./address.model";

export class StartLocation {
  constructor(
    public coordinates: {lat: number, lng: number},
    public address: AddressViewModel
  ) {}
}