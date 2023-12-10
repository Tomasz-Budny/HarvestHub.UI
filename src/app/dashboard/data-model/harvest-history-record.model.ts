import { CropType } from "./crop-type.model";
import { CultivationHistoryRecord } from "./cultivation-history-record.model";

export class HarvestHistoryRecord extends CultivationHistoryRecord {
  constructor(
    public override id: string,
    public override date: Date,
    public override type: string,
    public amount: number,
    public cropType: CropType,
    public humidity: number
  ) {
    super(id, date, type)
  }
}