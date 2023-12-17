import { HarvestHubError } from "./harvest-hub-error.model"

export interface HarvestHubResponse<T> {
  data: T,
  loaded: boolean
  error: HarvestHubError
}