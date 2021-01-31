import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpService} from "../../@core/services/http.service";
import {IAppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {
  ECarActions,
  GetCars,
  GetCarsSuccess,
  GetFilteredCars,
  GetFilteredCarsError,
  GetFilteredCarsSuccess
} from "../actions/car.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class CarEffects {
  @Effect()
  getCars$ = this._actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    map(action => action.payload),
    switchMap(isSold => this._httpService.getAllCars(isSold)),
    switchMap(cars => {
      return of(new GetCarsSuccess(cars));
    })
  );

  @Effect()
  getFilteredCars$ = this._actions$.pipe(
    ofType<GetFilteredCars>(ECarActions.GetFilteredCars),
    map(action => action.payload),
    switchMap(carFilterRequest => this._httpService.getSingleCar(
      carFilterRequest.formValue,
      carFilterRequest.selectedFilterValue,
      carFilterRequest.soldOrNot)
      .pipe(
        switchMap(cars => {
          return of(new GetFilteredCarsSuccess(cars));
        }),
        catchError((error) => {
          if (error.error.errorCode === '404') {
            return of(new GetFilteredCarsError('Ilyen paraméterű autó nem található!'));
          } else {
            return of(new GetFilteredCarsError('Az adatbáziskapcsolat váratlanul megszakadt!'));
          }
        })
      ))
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
