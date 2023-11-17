export interface FieldViewModel {
  name: string,
  area: number,
  address: string,
  color: string,
  center: {lat: number, lng: number}
  paths: {lat: number, lng: number}[]
}