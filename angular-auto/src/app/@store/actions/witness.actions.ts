import {Action} from "@ngrx/store";
import {IWitness} from "../../@core/models/witness";

export enum EWitnessActions {
  GetWitnesses = '[Witness] Get witnesses',
  GetWitnessesSuccess = '[Witness] Get witnesses success',
  WitnessError = '[string] Get witnesses error',
  StoreWitness = '[Witness] Store witness',
  StoreWitnessSuccess = '[Witness] Store witness success',
  DeleteWitness = '[number] Delete witness',
  DeleteWitnessSuccess = '[number] Delete witness success',
}

export class GetWitnesses implements Action {
  public readonly type = EWitnessActions.GetWitnesses;
  constructor(public readonly payload: IWitness) {
  }
}

export class GetWitnessesSuccess implements Action {
  public readonly type = EWitnessActions.GetWitnessesSuccess;
  constructor(public payload: IWitness[]) {
  }
}

export class WitnessError implements Action {
  public readonly type = EWitnessActions.WitnessError;
  constructor(public readonly payload: string) {
  }
}

export class StoreWitness implements Action {
  public readonly type = EWitnessActions.StoreWitness;
  constructor(public readonly payload: IWitness) {
  }
}

export class StoreWitnessSuccess implements Action {
  public readonly type = EWitnessActions.StoreWitnessSuccess;
  constructor(public readonly payload: IWitness) {
  }
}

export class DeleteWitness implements Action {
  public readonly type = EWitnessActions.DeleteWitness;
  constructor(public readonly payload: number) {
  }
}

export class DeleteWitnessSuccess implements Action {
  public readonly type = EWitnessActions.DeleteWitnessSuccess;
  constructor(public readonly payload: number) {
  }
}

export type WitnessActions =
  GetWitnesses |
  GetWitnessesSuccess |
  WitnessError |
  StoreWitness |
  StoreWitnessSuccess |
  DeleteWitness |
  DeleteWitnessSuccess;
