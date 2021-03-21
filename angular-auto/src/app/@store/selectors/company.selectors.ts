import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {ICompanyState} from "../state/company.state";

const selectCompanies = (state: IAppState) => state.company;

export const selectCompanySearchData = createSelector(
  selectCompanies,
  (state: ICompanyState) => state.companySearchData
);

export const selectPickedCompany = createSelector(
  selectCompanies,
  (state: ICompanyState) => state.pickedCompany
);

export const selectIndexOfPickedCompany = createSelector(
  selectCompanies,
  (state: ICompanyState) => state.indexOfPickedCompany
);

export const selectCompanyError = createSelector(
  selectCompanies,
  (state: ICompanyState) => state.error
);
