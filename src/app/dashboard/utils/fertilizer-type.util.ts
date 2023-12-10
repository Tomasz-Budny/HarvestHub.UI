import { FertilizerType } from "../data-model/fertilizer-type.model";

export class FertilizerTypeUtil {
  static getAllFertilizerTypes(): FertilizerType[] {
    return <FertilizerType[]>Object.values(FertilizerType).filter(fertilizerType => !isNaN(Number(fertilizerType)));
  }
}