import { CropType } from "../data-model/crop-type.model";

export class CropTypeUtil {
  static getAllCropTypes(): CropType[] {
    return <CropType[]>Object.values(CropType).filter(cropType => !isNaN(Number(cropType)));
  }
}