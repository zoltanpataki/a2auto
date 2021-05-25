import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {HttpService} from "../../@core/services/http.service";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {
  EOrderActions,
  GetCapacity,
  GetCarRegistry,
  GetChargeForInheritanceTax,
  GetExtraChargeAtSelling,
  GetInheritanceTaxError,
  GetInheritanceTaxSuccess,
  GetOrder,
  GetOrderError,
  GetOrderSuccess,
  StoreGiftIndexList,
  StoreGiftIndexListSuccess
} from "../actions/order.actions";
import {InheritanceTaxErrorResponse, InheritanceTaxInfoForChainedApiCall} from "../../@core/models/inheritanceTax";
import {Constants} from "../../@core/models/constants";
import {selectGiftIndexList} from "../selectors/order.selectors";
import cloneDeep from 'lodash.clonedeep';

@Injectable()
export class OrderEffects {
  @Effect()
  getCapacity$ = this._actions$.pipe(
    ofType<GetCapacity>(EOrderActions.GetCapacity),
    map(action => action.payload),
    switchMap(inheritanceTaxInfoForChainedApiCall =>
      this._httpService.getUtility(inheritanceTaxInfoForChainedApiCall.capacityRequest)
        .pipe(
          switchMap(capacity => {
            return of(new GetChargeForInheritanceTax(
              new InheritanceTaxInfoForChainedApiCall(
                Number(capacity.value),
                null,
                null,
                null,
                inheritanceTaxInfoForChainedApiCall.kwh,
                inheritanceTaxInfoForChainedApiCall.inheritanceChargeRequest,
                inheritanceTaxInfoForChainedApiCall.capacityRequest,
                inheritanceTaxInfoForChainedApiCall.carRegistryRequest,
                inheritanceTaxInfoForChainedApiCall.extraChargeAtSellingRequest)));
          }),
          catchError((error) => {
            return of(new GetInheritanceTaxError(
              new InheritanceTaxErrorResponse(
                'Sajnos az autó hengerűrtartalma hiányzik!',
                false,
                Constants.DONT_WANT_CALCULATION)));
          })
        )),
  );

  @Effect()
  getChargeForInheritanceTax$ = this._actions$.pipe(
    ofType<GetChargeForInheritanceTax>(EOrderActions.GetChargeForInheritanceTax),
    map(action => action.payload),
    switchMap(inheritanceTaxInfoForChainedApiCall =>
      this._httpService.getChargeForInheritanceTax(
        inheritanceTaxInfoForChainedApiCall.inheritanceChargeRequest.kw,
        inheritanceTaxInfoForChainedApiCall.inheritanceChargeRequest.age)
        .pipe(
          switchMap(charge => {
            return of(new GetCarRegistry(
              new InheritanceTaxInfoForChainedApiCall(
                inheritanceTaxInfoForChainedApiCall.capacity,
                null,
                charge,
                null,
                inheritanceTaxInfoForChainedApiCall.kwh,
                inheritanceTaxInfoForChainedApiCall.inheritanceChargeRequest,
                inheritanceTaxInfoForChainedApiCall.capacityRequest,
                inheritanceTaxInfoForChainedApiCall.carRegistryRequest,
                inheritanceTaxInfoForChainedApiCall.extraChargeAtSellingRequest)));
          }),
          catchError((error) => {
            return of(new GetInheritanceTaxError(new InheritanceTaxErrorResponse(
              'Sajnos az autó évjárata vagy lökettérfogata hiányzik!',
              false,
              Constants.DONT_WANT_CALCULATION)));
          })
        )),
  );

  @Effect()
  getCarRegistry$ = this._actions$.pipe(
    ofType<GetCarRegistry>(EOrderActions.GetCarRegistry),
    map(action => action.payload),
    switchMap(inheritanceTaxInfoForChainedApiCall =>
      this._httpService.getUtility(inheritanceTaxInfoForChainedApiCall.carRegistryRequest)
        .pipe(
          switchMap(carRegistry => {
            return of(new GetExtraChargeAtSelling(
              new InheritanceTaxInfoForChainedApiCall(
                inheritanceTaxInfoForChainedApiCall.capacity,
                Number(carRegistry.value),
                inheritanceTaxInfoForChainedApiCall.charge,
                null,
                inheritanceTaxInfoForChainedApiCall.kwh,
                inheritanceTaxInfoForChainedApiCall.inheritanceChargeRequest,
                inheritanceTaxInfoForChainedApiCall.capacityRequest,
                inheritanceTaxInfoForChainedApiCall.carRegistryRequest,
                inheritanceTaxInfoForChainedApiCall.extraChargeAtSellingRequest)));
          }),
          catchError((error) => {
            return of(new GetInheritanceTaxError(new InheritanceTaxErrorResponse(
              'Sajnos az adatbázis kapcsolat megszakadt!',
              false,
              Constants.DONT_WANT_CALCULATION)));
          })
        )),
  );

  @Effect()
  getExtraChargeAtSelling$ = this._actions$.pipe(
    ofType<GetExtraChargeAtSelling>(EOrderActions.GetExtraChargeAtSelling),
    map(action => action.payload),
    switchMap(inheritanceTaxInfoForChainedApiCall =>
      this._httpService.getUtility(inheritanceTaxInfoForChainedApiCall.extraChargeAtSellingRequest)
        .pipe(
          switchMap(extraChargeAtSelling => {
            const extraChargeAtSellingNumber = Number(extraChargeAtSelling.value);
            const inheritanceTax = inheritanceTaxInfoForChainedApiCall.capacity + (inheritanceTaxInfoForChainedApiCall.charge * inheritanceTaxInfoForChainedApiCall.kwh) + inheritanceTaxInfoForChainedApiCall.carRegistry + extraChargeAtSellingNumber;
            return of(new GetInheritanceTaxSuccess(inheritanceTax));
          }),
          catchError((error) => {
            return of(new GetInheritanceTaxError(new InheritanceTaxErrorResponse(
              'Sajnos az adatbázis kapcsolat megszakadt!',
              false,
              Constants.DONT_WANT_CALCULATION)));
          })
        )),
  );

  @Effect()
  getOrder$ = this._actions$.pipe(
    ofType<GetOrder>(EOrderActions.GetOrder),
    map(action => action.payload),
    switchMap(carId =>
      this._httpService.getOrder(carId)
        .pipe(
          switchMap(order => {
            return of(new GetOrderSuccess(order));
          }),
          catchError((error) => {
            if (error.error.errorCode === '404') {
              return of(new GetOrderError('Ehhez az autóhoz még nincs rendelés!'));
            } else {
              return of(new GetOrderError('Sajnos az adatbázis kapcsolat megszakadt!'));
            }
          })
        )),
  );

  @Effect()
  storeGiftIndexList$ = this._actions$.pipe(
    ofType<StoreGiftIndexList>(EOrderActions.StoreGiftIndexList),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectGiftIndexList))),
    switchMap(([updateGiftIndexListRequest, giftIndexes]) => {
      let allGiftIndexes = cloneDeep(giftIndexes);
      if (updateGiftIndexListRequest.isAdding) {
        allGiftIndexes.push(updateGiftIndexListRequest.index);
      }
      if (!updateGiftIndexListRequest.isAdding) {
        allGiftIndexes.splice(updateGiftIndexListRequest.index, 1);
      }
      if (updateGiftIndexListRequest.isDeletedDescription) {
        allGiftIndexes.forEach(function (item, indexOfItem, array) {
          if (item > updateGiftIndexListRequest.index) {
            item -= 1;
            array[indexOfItem] = item;
          }
        });
      }
      return of(new StoreGiftIndexListSuccess(allGiftIndexes));
    })
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {
  }
}
