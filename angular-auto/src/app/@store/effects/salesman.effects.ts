import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {
  ESalesmanActions,
  GetSalesmen,
  SalesmenError,
  GetSalesmenSuccess,
  StoreSalesmanSuccess, StoreSalesman, DeleteSalesman, DeleteSalesmanSuccess
} from "../actions/salesman.actions";

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
          return of(new SalesmenError('Az adatbáziskapcsolat váratlanul megszakadt!'));
        })
      )),
  );

  @Effect()
  storeSalesman$ = this._actions$.pipe(
    ofType<StoreSalesman>(ESalesmanActions.StoreSalesman),
    map(action => action.payload),
    switchMap(salesman => this._httpService.saveSalesman(salesman)),
    switchMap(salesman => {
      return of(new StoreSalesmanSuccess(salesman));
    }),
    catchError((error) => {
      return of(new SalesmenError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  @Effect()
  deleteSalesman$ = this._actions$.pipe(
    ofType<DeleteSalesman>(ESalesmanActions.DeleteSalesman),
    map(action => action.payload),
    switchMap(salesmanId => this._httpService.deleteSalesman(salesmanId)),
    switchMap(returnedSalesmanId => {
      console.log(returnedSalesmanId)
      return of(new DeleteSalesmanSuccess(Number(returnedSalesmanId)));
    }),
    catchError((error) => {
      return of(new SalesmenError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {
  }
}
