import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {
  EWitnessActions,
  GetWitnesses,
  WitnessError,
  GetWitnessesSuccess,
  StoreWitness, StoreWitnessSuccess, DeleteWitness, DeleteWitnessSuccess
} from "../actions/witness.actions";

@Injectable()
export class WitnessEffects {
  @Effect()
  getWitnesses$ = this._actions$.pipe(
    ofType<GetWitnesses>(EWitnessActions.GetWitnesses),
    map(action => action.payload),
    switchMap(extraWitness => this._httpService.getAllWitnesses()
      .pipe(
        switchMap(witnesses => {
          if ('NOT' !== extraWitness.name) {
            witnesses.push(extraWitness);
          }
          return of(new GetWitnessesSuccess(witnesses));
        }),
        catchError((error) => {
          return of(new WitnessError('Az adatbáziskapcsolat váratlanul megszakadt!'));
        })
      )),
  );

  @Effect()
  storeWitness$ = this._actions$.pipe(
    ofType<StoreWitness>(EWitnessActions.StoreWitness),
    map(action => action.payload),
    switchMap(witness => this._httpService.saveWitness(witness)),
    switchMap(witness => {
      return of(new StoreWitnessSuccess(witness));
    }),
    catchError((error) => {
      return of(new WitnessError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  @Effect()
  deleteWitness$ = this._actions$.pipe(
    ofType<DeleteWitness>(EWitnessActions.DeleteWitness),
    map(action => action.payload),
    switchMap(witnessId => this._httpService.deleteWitness(witnessId)),
    switchMap(returnedWitnessId => {
      return of(new DeleteWitnessSuccess(Number(returnedWitnessId)));
    }),
    catchError((error) => {
      return of(new WitnessError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {
  }
}
