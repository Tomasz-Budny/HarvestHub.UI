import { Injectable, signal } from "@angular/core";
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

  constructor() {}

  setUserContext(userModel: UserModel, error: HarvestHubError) {
    this.state.update(state => ({
      data: userModel,
      loaded: true,
      error: error
    }));
  }

  reset() {
    this.state.set({
      data: null,
      loaded: false,
      error: null
    });
  }
}