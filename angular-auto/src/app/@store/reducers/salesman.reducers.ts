import {initialSalesmanState, ISalesmanState} from "../state/salesman.state";
import {ESalesmanActions, SalesmanActions} from "../actions/salesman.actions";

export const salesmanReducers = (
  state = initialSalesmanState,
  action: SalesmanActions
): ISalesmanState => {
  switch (action.type) {
    case ESalesmanActions.GetSalesmenSuccess: {
      console.log("valami");
      console.log(action.payload);
      return {
        ...state,
        salesmen: action.payload,
        error: null
      };
    }
    case ESalesmanActions.GetSalesmenError: {
      return {
        ...state,
        salesmen: null,
        error: action.payload
      };
    }
    default : {
      return state;
    }
  }
}
