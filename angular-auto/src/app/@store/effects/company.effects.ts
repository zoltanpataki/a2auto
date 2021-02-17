import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {ECompanyActions, GetCompanies, GetCompaniesError, GetCompaniesSuccess} from "../actions/company.actions";

@Injectable()
export class CompanyEffects {
  @Effect()
  getCompanies$ = this._actions$.pipe(
    ofType<GetCompanies>(ECompanyActions.GetCompanies),
    map(action => action.payload),
    switchMap(companyFilterRequest => this._httpService.getCompany(
      companyFilterRequest.filter,
      companyFilterRequest.filterType)
      .pipe(
        switchMap(companies => {
          return of(new GetCompaniesSuccess(companies));
        }),
        catchError((error) => {
          if (error.error.errorCode === '404') {
            return of(new GetCompaniesError('Ilyen vásárló az adatbázisban nem található!'));
          } else {
            return of(new GetCompaniesError('Az adatbáziskapcsolat váratlanul megszakadt!'));
          }
        })
      )),
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {
  }
}
