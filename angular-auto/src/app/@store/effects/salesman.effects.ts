import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {ESalesmanActions, GetSalesmen, GetSalesmenError, GetSalesmenSuccess} from "../actions/salesman.actions";

@Injectable()
export class SalesmanEffects {
  @Effect()
  getSalesmen$ = this._actions$.pipe(
    ofType<GetSalesmen>(ESalesmanActions.GetSalesmen),
    switchMap(() => this._httpService.getAllSalesmen()
      .pipe(
        switchMap(salesmen => {
          return of(new GetSalesmenSuccess(salesmen));
        }),
        catchError((error) => {
          return of(new GetSalesmenError('Az adatbáziskapcsolat váratlanul megszakadt!'));
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
