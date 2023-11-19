import { CoordinatesViewModel } from "./coordinates.model";

export interface Polygon {
  vertices: CoordinatesViewModel[],
  center: CoordinatesViewModel,
  area: number
}