import { SoilClass } from "../data-model/soil-class.model";

export class SoilClassUtil {
  static getAllSoilClasses(): SoilClass[] {
    return <SoilClass[]>Object.values(SoilClass).filter(soilClass => !isNaN(Number(soilClass)));
  }
}