import {ICompanyState, initialCompanyState} from "../state/company.state";
import {CompanyActions, ECompanyActions} from "../actions/company.actions";

export const companyReducers = (
  state = initialCompanyState,
  action: CompanyActions
): ICompanyState => {
  switch (action.type) {
    case ECompanyActions.GetCompaniesSuccess: {
      return {
        ...state,
        companySearchData: action.payload,
        error: null
      };
    }
    case ECompanyActions.GetCompaniesError: {
      return {
        ...state,
        companySearchData: null,
        error: action.payload
      };
    }
    case ECompanyActions.StorePickedCompany: {
      return {
        ...state,
        pickedCompany: action.payload,
        error: null
      };
    }
    case ECompanyActions.StorePickedCompanyIndex: {
      return {
        ...state,
        indexOfPickedCompany: action.payload,
        error: null
      };
    }
    default : {
      return state;
    }
  }
}
