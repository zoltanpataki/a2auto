import {Action} from "@ngrx/store";
import {IUser, UserFilterRequest} from "../../@core/models/users";

export enum EUserActions {
  GetUsers = '[Users] Get users',
  GetUsersSuccess = '[Users] Get users success',
  GetUsersError = '[string] Get users error',
  StorePickedUser = '[Users] Store picked user',
  StorePickedUserIndex = '[number] Store picked user index',
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
  constructor(public payload: UserFilterRequest) {
  }
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) {
  }
}

export class GetUsersError implements Action {
  public readonly type = EUserActions.GetUsersError;
  constructor(public readonly payload: string) {
  }
}

export class StorePickedUser implements Action {
  public readonly type = EUserActions.StorePickedUser;
  constructor(public readonly payload: IUser) {
  }
}

export class StorePickedUserIndex implements Action {
  public readonly type = EUserActions.StorePickedUserIndex;
  constructor(public readonly payload: number) {
  }
}

export type UserActions =
  GetUsers |
  StorePickedUser |
  StorePickedUserIndex |
  GetUsersSuccess |
  GetUsersError;
