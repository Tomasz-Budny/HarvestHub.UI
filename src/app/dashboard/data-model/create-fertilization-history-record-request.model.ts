import { FertilizerType } from "./fertilizer-type.model";

export class FertilizationHistoryRecordRequest {
  constructor(
    public date: Date,
    public amount: number,
    public fertilizerType: FertilizerType
  ) {}
}