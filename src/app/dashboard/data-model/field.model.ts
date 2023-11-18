import { AddressViewModel } from "./address.model"
import { CoordinatesViewModel } from "./coordinates.model";

export class FieldViewModel {
  constructor(
    public id: string,
    public name: string,
    public area: number,
    public color: string,
    public center: CoordinatesViewModel,
    public paths: CoordinatesViewModel[],
    public address: AddressViewModel
  ) {}
}