import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {EUserActions, GetUsers, GetUsersError, GetUsersSuccess} from "../actions/user.actions";
import {HttpService} from "../../@core/services/http.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";

@Injectable()
export class UserEffects {
  @Effect()
  getUsers$ = this._actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    map(action => action.payload),
    switchMap(userFilterRequest => this._httpService.getUser(
      userFilterRequest.filter,
      userFilterRequest.filterType)
      .pipe(
        switchMap(users => {
          return of(new GetUsersSuccess(users));
        }),
        catchError((error) => {
          if (error.error.errorCode === '404') {
            return of(new GetUsersError('Ilyen vásárló az adatbázisban nem található!'));
          } else {
            return of(new GetUsersError('Az adatbáziskapcsolat váratlanul megszakadt!'));
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
