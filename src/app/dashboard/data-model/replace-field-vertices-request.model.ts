import { Polygon } from "./polygon.model";

export interface ReplaceFieldVerticesRequest {
  polygon: Polygon,
  fieldId: string
}