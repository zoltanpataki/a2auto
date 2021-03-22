import {Action} from "@ngrx/store";
import {IWitness} from "../../@core/models/witness";

export enum EWitnessActions {
  GetWitnesses = '[Witness] Get witnesses',
  GetWitnessesSuccess = '[Witness] Get witnesses success',
  GetWitnessesError = '[string] Get witnesses error',
}

export class GetWitnesses implements Action {
  public readonly type = EWitnessActions.GetWitnesses;
}

export class GetWitnessesSuccess implements Action {
  public readonly type = EWitnessActions.GetWitnessesSuccess;
  constructor(public payload: IWitness[]) {
  }
}

export class GetWitnessesError implements Action {
  public readonly type = EWitnessActions.GetWitnessesError;
  constructor(public readonly payload: string) {
  }
}

export type WitnessActions =
  GetWitnesses |
  GetWitnessesSuccess |
  GetWitnessesError;
