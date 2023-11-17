import { WeekDay } from "@angular/common";
import { WeatherStatus } from "./weather-status.model";

export class DayForecastViewModel {
  constructor(
    public temperature: number,
    public weekDay: WeekDay,
    public weatherStatus: WeatherStatus,
    public rainChances: number
  ) {}
}