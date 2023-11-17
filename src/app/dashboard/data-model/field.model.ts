import { AddressViewModel } from "./address.model"

export class FieldViewModel {
  constructor(
    public name: string,
    public area: number,
    public color: string,
    public center: {lat: number, lng: number},
    public paths: {lat: number, lng: number}[],
    public address: AddressViewModel
  ) {}
}