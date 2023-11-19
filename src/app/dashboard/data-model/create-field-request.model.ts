import { CoordinatesViewModel } from "./coordinates.model";

export interface CreateFieldRequest {
  name: string,
  center: CoordinatesViewModel,
  area: number,
  color: string,
  vertices: CoordinatesViewModel[]
}