export interface HarvestHubResponse<T> {
  data: T,
  loaded: boolean
  error: string
}