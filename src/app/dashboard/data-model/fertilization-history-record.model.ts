import { CultivationHistoryRecord } from "./cultivation-history-record.model";
import { FertilizerType } from "./fertilizer-type.model";

export class FertilizationHistoryRecord extends CultivationHistoryRecord {
  constructor(
    public override id: string,
    public override date: Date,
    public override type: string,
    public fertilizerType: FertilizerType,
    public amount: number
  ) {
    super(id, date, type)
  }
}