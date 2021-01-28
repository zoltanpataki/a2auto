import {ActionReducer, INIT} from "@ngrx/store";
import {IAppState} from "../state/app.state";

export const hydrationMetaReducer = (
  reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> => {
  return (state, action) => {
    if (action.type === INIT) {
      const storageValue = localStorage.getItem("selectedCars");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("selectedCars");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("selectedCars", JSON.stringify(nextState));
    return nextState;
  };
};
