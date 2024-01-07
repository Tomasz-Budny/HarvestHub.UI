import { Injectable, computed, signal } from "@angular/core";
import { HarvestHubResponse } from "../../shared/data-model/harvest-hub-response.model";
import { UserModel } from "../data-model/user.model";
import { HarvestHubError } from "../../shared/data-model/harvest-hub-error.model";

@Injectable({
  providedIn: 'root'
})
export class UserContextService { 
  private state = signal<HarvestHubResponse<UserModel>>({
    data: null,
    loaded: false,
    error: null
  });

  user = computed(() => this.state().data);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error)

  constructor() {}

  setUserContext(userModel: UserModel, error: HarvestHubError) {
    this.state.update(_ => ({
      data: userModel,
      loaded: error ? false : true,
      error: error
    }));
  }
}


