import {initialSalesmanState, ISalesmanState} from "../state/salesman.state";
import {ESalesmanActions, SalesmanActions} from "../actions/salesman.actions";

export const salesmanReducers = (
  state = initialSalesmanState,
  action: SalesmanActions
): ISalesmanState => {
  switch (action.type) {
    case ESalesmanActions.GetSalesmenSuccess: {
      return {
        ...state,
        salesmen: action.payload,
        error: null
      };
    }
    case ESalesmanActions.SalesmenError: {
      return {
        ...state,
        salesmen: null,
        error: action.payload
      };
    }
    case ESalesmanActions.StoreSalesmanSuccess: {
      return {
        ...state,
        salesmen: [...state.salesmen, action.payload],
        error: null
      };
    }
    case ESalesmanActions.DeleteSalesmanSuccess: {
      return {
        ...state,
        salesmen: state.salesmen.filter(salesman => salesman.id !== action.payload),
        error: null
      };
    }
    default : {
      return state;
    }
  }
}
