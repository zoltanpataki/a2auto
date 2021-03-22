import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IWitnessState} from "../state/witness.state";

const selectWitnesses = (state: IAppState) => state.witness;

export const selectWitnessList = createSelector(
  selectWitnesses,
  (state: IWitnessState) => state.witnesses
);

export const selectWitnessError = createSelector(
  selectWitnesses,
  (state: IWitnessState) => state.error
);
