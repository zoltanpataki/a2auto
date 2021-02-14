import {Action} from "@ngrx/store";

export enum EOrderActions {
  StorePreviousOrNew = '[string] Store previous or new customer flag'
}

export class StorePreviousOrNew implements Action {
  public readonly type = EOrderActions.StorePreviousOrNew;
  constructor(public payload: string) {}
}

export type OrderActions =
  StorePreviousOrNew;
