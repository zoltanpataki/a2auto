import {IWitness} from "../../@core/models/witness";

export interface IWitnessState {
  witnesses: IWitness[];
  error: string;
}

export const initialWitnessState: IWitnessState = {
  witnesses: null,
  error: null
}
