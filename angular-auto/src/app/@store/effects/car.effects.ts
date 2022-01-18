import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpService} from "../../@core/services/http.service";
import {IAppState} from "../state/app.state";
import {select, Store} from "@ngrx/store";
import {
  ECarActions,
  GetCars,
  GetCarsError,
  GetCarsSuccess, GetCountInCar,
  GetFilteredCars,
  GetFilteredCarsError,
  GetFilteredCarsSuccess,
  StoreNameOfBuyer,
  UpdateCarError,
  UpdateCarHandOverDate,
  UpdateCarSalesman,
  UpdateCarTypeOfBuying
} from "../actions/car.actions";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {selectCarList} from "../selectors/car.selectors";
import cloneDeep from 'lodash.clonedeep';
import {CarsAndQuantity} from "../../@core/models/carsAndQuantity";
import {GetCompaniesSuccess} from "../actions/company.actions";
import {StoreCountInCar} from "../actions/order.actions";

@Injectable()
export class CarEffects {
  @Effect()
  getCars$ = this._actions$.pipe(
    ofType<GetCars>(ECarActions.GetCars),
    map(action => action.payload),
    switchMap(carFilterRequest => this._httpService.getAllCars(
        carFilterRequest.isSold,
        carFilterRequest.pageLimit,
        carFilterRequest.pageOffset,
        carFilterRequest.orderBy,
        carFilterRequest.orderDirection
      )
    ),
    switchMap(carsAndQuantity => {
      return of(new GetCarsSuccess(carsAndQuantity));
    }),
    catchError((error) => {
      return of(new GetCarsError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  @Effect()
  getFilteredCars$ = this._actions$.pipe(
    ofType<GetFilteredCars>(ECarActions.GetFilteredCars),
    map(action => action.payload),
    switchMap(carFilterRequest => this._httpService.getFilteredCars(
      carFilterRequest.carSearchText,
      carFilterRequest.selectedFilterType,
      carFilterRequest.isSold,
      carFilterRequest.pageLimit,
      carFilterRequest.pageOffset,
      carFilterRequest.orderBy,
      carFilterRequest.orderDirection
    )
      .pipe(
        switchMap(carsAndQuantity => {
          return of(new GetFilteredCarsSuccess(carsAndQuantity));
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

  @Effect()
  getCountInCar$ = this._actions$.pipe(
    ofType<GetCountInCar>(ECarActions.GetCountInCar),
    map(action => action.payload),
    switchMap(countInCarId =>
      this._httpService.getSingleCarById(countInCarId)
        .pipe(
          switchMap(car => {
            return of(new StoreCountInCar(car));
          }),
          catchError((error) => {
            return of(new GetCarsError('Az adatbáziskapcsolat váratlanul megszakadt!'));
          })
        ))
  );

  @Effect()
  updateNameOfBuyer$ = this._actions$.pipe(
    ofType<StoreNameOfBuyer>(ECarActions.StoreNameOfBuyer),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([carUpdateModel, carsAndQuantity]) => {
      let allCars = cloneDeep(carsAndQuantity.cars);
      let pickedCar = allCars[carUpdateModel.clickedCarIndex];
      pickedCar.nameOfBuyer = carUpdateModel.nameOfBuyer;
      allCars[carUpdateModel.clickedCarIndex] = pickedCar;
      this._httpService.updateCar(pickedCar).subscribe(data => {
        console.log(data);
      });
      sessionStorage.setItem("selectedCars", allCars);
      return of(new GetCarsSuccess(new CarsAndQuantity(carsAndQuantity.quantity, allCars)));
    }),
    catchError((error) => {
      return of(new UpdateCarError('Az adatbáziskapcsolat váratlanul megszakadt! 1111'));
    })
  );

  @Effect()
  updateCarSalesman$ = this._actions$.pipe(
    ofType<UpdateCarSalesman>(ECarActions.UpdateCarSalesman),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([carUpdateModel, carsAndQuantity]) => {
      let allCars = cloneDeep(carsAndQuantity.cars);
      let pickedCar = allCars[carUpdateModel.clickedCarIndex];
      pickedCar.salesman = carUpdateModel.salesman;
      allCars[carUpdateModel.clickedCarIndex] = pickedCar;
      this._httpService.updateCar(pickedCar).subscribe(data => {
        console.log(data);
      });
      sessionStorage.setItem("selectedCars", allCars);
      return of(new GetCarsSuccess(new CarsAndQuantity(carsAndQuantity.quantity, allCars)));
    }),
    catchError((error) => {
      return of(new UpdateCarError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  @Effect()
  updateCarHandOverDate$ = this._actions$.pipe(
    ofType<UpdateCarHandOverDate>(ECarActions.UpdateCarHandOverDate),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([carUpdateModel, carsAndQuantity]) => {
      let allCars = cloneDeep(carsAndQuantity.cars);
      let pickedCar = allCars[carUpdateModel.clickedCarIndex];
      pickedCar.carHandover = carUpdateModel.carHandOverDate;
      allCars[carUpdateModel.clickedCarIndex] = pickedCar;
      this._httpService.updateCar(pickedCar).subscribe(data => {
        console.log(data);
      });
      sessionStorage.setItem("selectedCars", allCars);
      return of(new GetCarsSuccess(new CarsAndQuantity(carsAndQuantity.quantity, allCars)));
    }),
    catchError((error) => {
      return of(new UpdateCarError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  @Effect()
  updateCarTypeOfBuying$ = this._actions$.pipe(
    ofType<UpdateCarTypeOfBuying>(ECarActions.UpdateCarTypeOfBuying),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectCarList))),
    switchMap(([carUpdateModel, carsAndQuantity]) => {
      let allCars = cloneDeep(carsAndQuantity.cars);
      let pickedCar = allCars[carUpdateModel.clickedCarIndex];
      pickedCar.typeOfBuying = carUpdateModel.typeOfBuying;
      allCars[carUpdateModel.clickedCarIndex] = pickedCar;
      this._httpService.updateCar(pickedCar).subscribe(data => {
        console.log(data);
      });
      sessionStorage.setItem("selectedCars", allCars);
      return of(new GetCarsSuccess(new CarsAndQuantity(carsAndQuantity.quantity, allCars)));
    }),
    catchError((error) => {
      return of(new UpdateCarError('Az adatbáziskapcsolat váratlanul megszakadt!'));
    })
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {
  }
}
