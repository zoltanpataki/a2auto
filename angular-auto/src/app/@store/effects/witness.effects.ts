import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {EWitnessActions, GetWitnesses, GetWitnessesError, GetWitnessesSuccess} from "../actions/witness.actions";

@Injectable()
export class WitnessEffects {
  @Effect()
  getWitnesses$ = this._actions$.pipe(
    ofType<GetWitnesses>(EWitnessActions.GetWitnesses),
    switchMap(() => this._httpService.getAllWitnesses()
      .pipe(
        switchMap(witnesses => {
          return of(new GetWitnessesSuccess(witnesses));
        }),
        catchError((error) => {
          return of(new GetWitnessesError('Az adatbáziskapcsolat váratlanul megszakadt!'));
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
