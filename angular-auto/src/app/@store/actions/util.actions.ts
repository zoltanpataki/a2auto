import {Action} from "@ngrx/store";

export enum EUtilActions {
  StoreIsBlankPage = '[boolean] Store whether blank page is clicked',
  StoreIsTrophyClicked = '[boolean] Store whether trophy is clicked',
}

export class StoreIsBlankPage implements Action {
  public readonly type = EUtilActions.StoreIsBlankPage;
  constructor(public readonly payload: boolean) {
  }
}

export class StoreIsTrophyClicked implements Action {
  public readonly type = EUtilActions.StoreIsTrophyClicked;
  constructor(public readonly payload: boolean) {
  }
}

export type UtilActions =
  StoreIsBlankPage |
  StoreIsTrophyClicked;
