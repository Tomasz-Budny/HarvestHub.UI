import { CultivationHistoryRecord } from "./cultivation-history-record.model";

export class FertilizationHistoryRecord extends CultivationHistoryRecord {
  constructor(
    public override id: string,
    public override date: Date,
    public override type: string,
    public fertilizerType: number,
    public amount: number
  ) {
    super(id, date, type)
  }
}