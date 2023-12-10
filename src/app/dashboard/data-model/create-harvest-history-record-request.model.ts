import { CropType } from "./crop-type.model";

export class CreateHarvestHistoryRecordRequest {
  constructor(
    public amount: number,
    public humidity: number,
    public cropType: CropType,
    public date: Date
  ) {}
}