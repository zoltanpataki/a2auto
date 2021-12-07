import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {SelectedFilter} from "../../models/selectedFilter";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {Car, CarFilterRequest, CarUpdateModel, ICar} from "../../models/car";
import {WarningDialogComponent} from "../../dialog/warning-dialog/warning-dialog.component";
import {CreditDialogComponent} from "../../dialog/credit-dialog/credit-dialog.component";
import {CountInCarSupplement} from "../../models/countInCarSupplement";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {IUser, UserFilterRequest, Users} from "../../models/users";
import {Credit} from "../../models/credit";
import {Company, CompanyFilterRequest, ICompany} from "../../models/company";
import {NavigationEnd, Router} from "@angular/router";
import {Order, UpdateDescriptionWithAmountRequest, UpdateGiftIndexListRequest} from "../../models/order";
import {Description} from "../../models/description";
import {CarTimeInfoComponent} from "../../dialog/car-time-info/car-time-info.component";
import {Witness} from "../../models/witness";
import {WitnessPickerDialogComponent} from "../../dialog/witness-picker-dialog/witness-picker-dialog.component";
import {DescriptionWithAmount} from "../../models/descriptionWithAmount";
import {Direction, Organizer} from "../../models/organizer";
import {IAppState} from "../../../@store/state/app.state";
import {select, Store} from "@ngrx/store";
import {
  selectCarError,
  selectCarList,
  selectClickedCarIndex,
  selectPickedCar, selectSearchParameters
} from "../../../@store/selectors/car.selectors";
import {
  GetCars,
  GetCarsSuccess,
  GetFilteredCars,
  StoreClickedCarIndex,
  StoreNameOfBuyer,
  StorePickedCar,
  UpdateCarHandOverDate,
  UpdateCarSalesman, UpdateCarTypeOfBuying, UpdateSearchParameters
} from "../../../@store/actions/car.actions";
import {Observable} from "rxjs";
import {Constants} from "../../models/constants";
import {
  selectActualOrder,
  selectAddCountInCar,
  selectAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready,
  selectAskForInheritanceTaxCalculation,
  selectCountInCar,
  selectCountInCarSupplement,
  selectCredit,
  selectCreditNeedsToBeRecalculated,
  selectDescriptionsWithAmount,
  selectDownPayment,
  selectExtraPayment,
  selectGiftIndexList,
  selectIndividualOrCorporate,
  selectInheritanceTax,
  selectInheritanceTaxError,
  selectNewCompany,
  selectNewUser,
  selectOrderError,
  selectOrderProgress,
  selectPreviousOrNew,
  selectRemarks,
  selectSalesman,
  selectSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate,
  selectThereIsCountInCar,
  selectTypeOfBuying,
  selectWantInheritanceTaxCalculation
} from "../../../@store/selectors/order.selectors";
import {
  GetCapacity,
  GetInheritanceTaxSuccess,
  GetOrder,
  OrderError,
  RemoveDescriptionWithAmount,
  SaveOrder,
  StoreAddCountInCar,
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready,
  StoreAskForInheritanceTaxCalculation,
  StoreCountInCar,
  StoreCountInCarSupplement,
  StoreCredit,
  StoreCreditNeedsToBeRecalculated,
  StoreDescriptionsWithAmount,
  StoreDownPayment,
  StoreExtraPayment,
  StoreGiftIndexList,
  StoreGiftIndexListSuccess,
  StoreIndividualOrCorporate,
  StoreNewCompany,
  StoreNewUser,
  StorePreviousOrNew,
  StoreRemarks,
  StoreSalesman,
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate,
  StoreThereIsCountInCar,
  StoreTypeOfBuying,
  StoreWantInheritanceTaxCalculation,
  UpdateDescriptionWithAmount,
  UpdateOrder,
  UpdateOrderProgress
} from "../../../@store/actions/order.actions";
import {
  selectIndexOfPickedUser,
  selectPickedUser,
  selectUserSearchData
} from "../../../@store/selectors/user.selectors";
import {
  selectCompanySearchData,
  selectIndexOfPickedCompany,
  selectPickedCompany
} from "../../../@store/selectors/company.selectors";
import {GetUsers, GetUsersSuccess, StorePickedUser, StorePickedUserIndex} from "../../../@store/actions/user.actions";
import {
  GetCompanies,
  GetCompaniesSuccess,
  StorePickedCompany,
  StorePickedCompanyIndex
} from "../../../@store/actions/company.actions";
import {GetWitnesses} from "../../../@store/actions/witness.actions";
import {selectSalesmenList} from "../../../@store/selectors/salesman.selectors";
import {selectWitnessList} from "../../../@store/selectors/witness.selectors";
import {GetSalesmen} from "../../../@store/actions/salesman.actions";
import {InheritanceChargeRequest, InheritanceTaxInfoForChainedApiCall} from "../../models/inheritanceTax";
import {StoreIsBlankPage} from "../../../@store/actions/util.actions";
import {SearchParameters} from "../../models/searchParameters";
import {CarsAndQuantity} from "../../models/carsAndQuantity";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  public get direction(): typeof Direction {
    return Direction;
  }
  public countInCarSupplementForm: FormGroup;
  public filters = [
    {viewValue: 'Modell', value: 'name'},
    {viewValue: 'Rendszám', value: 'plateNumber'},
    {viewValue: 'Márka', value: 'type'},
    {viewValue: 'Összes', value: 'all'},
    {viewValue: 'Eladott', value: 'sold'}
  ];
  public organizers = [
    {viewValue: 'Márka', value: 'type', direction: Direction.up, icon: 'loyalty', iconColor: '#6C6EA0'},
    {viewValue: 'Márka', value: 'type', direction: Direction.down, icon: 'loyalty', iconColor: '#6C6EA0'},
    {viewValue: 'Vásárló', value: 'buyer', direction: Direction.up, icon: 'person', iconColor: '#F4D03F'},
    {viewValue: 'Vásárló', value: 'buyer', direction: Direction.down, icon: 'person', iconColor: '#F4D03F'},
    {viewValue: 'Model', value: 'name', direction: Direction.up, icon: 'webhook', iconColor: '#58D68D'},
    {viewValue: 'Model', value: 'name', direction: Direction.down, icon: 'webhook', iconColor: '#58D68D'},
    {viewValue: 'Rendszám', value: 'plateNumber', direction: Direction.up, icon: 'fingerprint', iconColor: 'deeppink'},
    {viewValue: 'Rendszám', value: 'plateNumber', direction: Direction.down, icon: 'fingerprint', iconColor: 'deeppink'}
  ];
  public secondaryFilters = [{viewValue: 'Modell', value: 'name'}, {viewValue: 'Rendszám', value: 'plateNumber'}, {viewValue: 'Márka', value: 'type'}];
  public userFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Város', value: 'city'}];
  public selectedFilter: SelectedFilter;
  public selectedOrganizer: Organizer;
  public secondarySelectedFilter: SelectedFilter;
  public selectedUserFilter: SelectedFilter;
  public companyFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Cégjegyzékszám', value: 'companyRegistrationNumber'}];
  public selectedCompanyFilter: SelectedFilter;
  public selectedCars: Car[] = [];
  public selectedCarsAndQuantity$: Observable<CarsAndQuantity>;
  public carErrorObs: Observable<string>;
  public orderErrorObs: Observable<string>;
  public inheritanceTaxErrorObs: Observable<string>;
  public selectedCarHeader = ['Márka', 'Modell', 'Rendszám', 'Vevő', 'Vásárlás dátuma'];
  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporateObs: Observable<boolean>;
  public selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: boolean;
  public alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlreadyObs: Observable<boolean>;
  public alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean;
  public previousOrNewObs: Observable<string>;
  public previousOrNew: string;
  public individualOrCorporateObs: Observable<string>;
  public individualOrCorporate: string;
  public selectedTypeOfBuyingObs: Observable<string>;
  public selectedTypeOfBuying;
  public carOfTransactionObs: Observable<ICar>;
  public carOfTransaction: Car;
  public userSearchResultObs: Observable<IUser[]>;
  public userSearchResult = new MatTableDataSource<Users>();
  public companySearchResultObs: Observable<ICompany[]>;
  public companySearchResult = new MatTableDataSource<Company>();
  public inheritanceTaxObs: Observable<number>;
  public inheritanceTax: number;
  public orderProgressObs: Observable<number>;
  public orderProgress: number = 0;
  public askForInheritanceTaxCalculationObs: Observable<string>;
  public askForInheritanceTaxCalculation: string;
  public wantInheritanceTaxCalculationObs: Observable<boolean>;
  public wantInheritanceTaxCalculation: boolean;
  public addCountInCarObs: Observable<string>;
  public addCountInCar: string;
  public thereIsCountInCarObs: Observable<boolean>;
  public thereIsCountInCar: boolean;
  public countInCarSupplementObs: Observable<CountInCarSupplement>;
  public countInCarSupplement: CountInCarSupplement;
  public clickedCarIndexObs: Observable<number>;
  public clickedCarIndex: number;
  public extraObs: Observable<number>;
  public extra: number;
  public userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  public companyDisplayedColumns: string[] = ['name', 'registrationNumber', 'representation', 'symbol'];
  public pickedUserObs: Observable<IUser>;
  public pickedUser: Users;
  public pickedCompanyObs: Observable<ICompany>;
  public pickedCompany: Company;
  public indexOfPickedUserObs: Observable<number>;
  public indexOfPickedUser: number;
  public indexOfPickedCompanyObs: Observable<number>;
  public indexOfPickedCompany: number;
  public creditDataObs: Observable<Credit>;
  public creditData: Credit;
  public countInCarObs: Observable<ICar>;
  public countInCar: Car;
  public salesmanObs: Observable<string>;
  public salesman: string;
  public newOrderObs: Observable<Order>;
  public newOrder: Order;
  public newUserObs: Observable<IUser>;
  public newUser: Users;
  public newCompanyObs: Observable<ICompany>;
  public newCompany: Company;
  public descriptionListObs: Observable<Description[]>;
  public descriptionList: Description[] = [];
  public switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: boolean = true;
  // Downpayment form variables
  public downPaymentForm: FormGroup;
  public downPaymentObs: Observable<number>;
  public downPayment: number;
  // Description with amount form variables
  public descriptionForm: FormGroup;
  public description: FormArray;
  public descriptions: FormArray;
  public listOfDescriptionsWithAmountObs: Observable<DescriptionWithAmount[]>;
  public listOfDescriptionsWithAmount: DescriptionWithAmount[] = [];
  public chargedBehalf = ['AJÁNDÉK', 'VEVŐ FIZETI'];
  public giftIndexListObs: Observable<number[]>;
  public giftIndexList = [];
  @ViewChild('focuser', { read: ElementRef })
  public focuser: ElementRef;
  public tooLongFieldValue: string = '';
  public isThereLongFieldValue: boolean = false;
  public creditNeedsToBeRecalculatedObs: Observable<boolean>;
  public creditNeedsToBeRecalculated: boolean = false;
  public PREVIOUS: string = Constants.PREVIOUS;
  public NEW: string = Constants.NEW;
  public INDIVIDUAL: string = Constants.INDIVIDUAL;
  public CORPORATE: string = Constants.CORPORATE;
  public WANT_CALCULATION: string = Constants.WANT_CALCULATION;
  public DONT_WANT_CALCULATION: string = Constants.DONT_WANT_CALCULATION;
  public COUNT_IN: string = Constants.COUNT_IN;
  public NO_COUNT_IN: string = Constants.NO_COUNT_IN;
  public numberOfPages: number = 0;
  public recentPage: number = 1;
  public searchParameters$: Observable<SearchParameters>;
  public searchParameters: SearchParameters;

  constructor(private httpService: HttpService,
              public utilService: UtilService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef,
              public router: Router,
              private _store: Store<IAppState>,) {
    router.events
      .subscribe((event: NavigationEnd) => {
        if (event.url !== event.urlAfterRedirects && event.url !== '/filter') {
          this.removeItemsFromSessionStorage();
        }
        if (event.url === '/filter' && sessionStorage.getItem('blankPage') != null) {
          sessionStorage.removeItem('blankPage');
          sessionStorage.removeItem('insuredCar');
        }
        if (event.url === '/filter' && sessionStorage.getItem('trophyClick') != null) {
          this.utilService.removeItemsFromSessionStorage();
        }
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
          sessionStorage.removeItem('userSearchDataOnUserPage');
          sessionStorage.removeItem('pickedUserOnUserPage');
          sessionStorage.removeItem('indexOfPickedUserOnUserPage');
        }
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
          sessionStorage.removeItem('companySearchDataOnCompanyPage');
          sessionStorage.removeItem('pickedCompanyOnCompanyPage');
          sessionStorage.removeItem('indexOfPickedCompanyOnCompanyPage');
        }
      });
  }

  // Prepare formGroups and get the necessary data from sessionStorage
  ngOnInit() {
    if (sessionStorage.getItem('selectedCars')) {
      this.selectedCars = JSON.parse(sessionStorage.getItem('selectedCars'));
      const carsAndQuantity = new CarsAndQuantity(this.selectedCars.length, this.selectedCars)
      this._store.dispatch(new GetCarsSuccess(carsAndQuantity));
    }

    if (this.utilService.witnessesObs == null) {
      this._store.dispatch(new GetWitnesses(this.utilService.createBlankWitnessToUtilServiceWitnessList()));
    }

    if (this.utilService.salesmenObs == null) {
      this._store.dispatch(new  GetSalesmen());
    }

    if (sessionStorage.getItem('clickedCarIndex')) {
      this.clickedCarIndex = Number(sessionStorage.getItem('clickedCarIndex'));
      this._store.dispatch(new StoreClickedCarIndex(this.clickedCarIndex));
      this.carOfTransaction = this.selectedCars[this.clickedCarIndex];
      if (this.carOfTransaction && this.carOfTransaction.carHandover && new Date(this.carOfTransaction.carHandover).getFullYear() === new Date(0).getFullYear()) {
        this.carOfTransaction.carHandover = null;
      }
      this._store.dispatch(new StorePickedCar(this.carOfTransaction));
    }
    if (sessionStorage.getItem('order')) {
      const order = JSON.parse(sessionStorage.getItem('order'));
      if (order.carId && order.carId === this.carOfTransaction.id) {
        this._store.dispatch(new UpdateOrder(order));
        this.getDataFromSessionStorageAfterRefresh();
      }
    } else {
      this.getDataFromSessionStorageAfterRefresh();
    }
    if (this.countInCarSupplement == null) {
      this.createEmptyCarSupplementForm();
    } else {
      this.setCountInCarSupplementForm(this.countInCarSupplement);
    }
    if (this.listOfDescriptionsWithAmount.length === 0) {
      this.descriptionForm = this.formBuilder.group({
        description: this.formBuilder.array([this.createDescriptionWithAmountRow(null)])
      });
    }

    if (this.downPayment == null) {
      this.createEmptyDownPaymentForm();
    } else {
      this.createDownPaymentFormWithData(this.downPayment, this.extra);
    }
    this.changeDetectorRefs.detectChanges();

    //ngrx selectors

    this.utilService.salesmenObs = this._store.pipe(select(selectSalesmenList));
    this.utilService.witnessesObs = this._store.pipe(select(selectWitnessList));
    this.clickedCarIndexObs = this._store.pipe(select(selectClickedCarIndex));
    this.carOfTransactionObs = this._store.pipe(select(selectPickedCar));
    this.selectedCarsAndQuantity$ = this._store.pipe(select(selectCarList));
    this.carErrorObs = this._store.pipe(select(selectCarError));
    this.orderErrorObs = this._store.pipe(select(selectOrderError));
    this.inheritanceTaxErrorObs = this._store.pipe(select(selectInheritanceTaxError));
    this.previousOrNewObs = this._store.pipe(select(selectPreviousOrNew));
    this.individualOrCorporateObs = this._store.pipe(select(selectIndividualOrCorporate));
    this.askForInheritanceTaxCalculationObs = this._store.pipe(select(selectAskForInheritanceTaxCalculation));
    this.addCountInCarObs = this._store.pipe(select(selectAddCountInCar));
    this.orderProgressObs = this._store.pipe(select(selectOrderProgress));
    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlreadyObs =
      this._store.pipe(select(selectAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready));
    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporateObs =
      this._store.pipe(select(selectSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate));
    this.wantInheritanceTaxCalculationObs = this._store.pipe(select(selectWantInheritanceTaxCalculation));
    this.thereIsCountInCarObs = this._store.pipe(select(selectThereIsCountInCar));
    this.newOrderObs = this._store.pipe(select(selectActualOrder));
    this.userSearchResultObs = this._store.pipe(select(selectUserSearchData));
    this.pickedUserObs = this._store.pipe(select(selectPickedUser));
    this.indexOfPickedUserObs = this._store.pipe(select(selectIndexOfPickedUser));
    this.companySearchResultObs = this._store.pipe(select(selectCompanySearchData));
    this.pickedCompanyObs = this._store.pipe(select(selectPickedCompany));
    this.indexOfPickedCompanyObs = this._store.pipe(select(selectIndexOfPickedCompany));
    this.inheritanceTaxObs = this._store.pipe(select(selectInheritanceTax));
    this.countInCarObs = this._store.pipe(select(selectCountInCar));
    this.countInCarSupplementObs = this._store.pipe(select(selectCountInCarSupplement));
    this.downPaymentObs = this._store.pipe(select(selectDownPayment));
    this.extraObs = this._store.pipe(select(selectExtraPayment));
    this.newUserObs = this._store.pipe(select(selectNewUser));
    this.newCompanyObs = this._store.pipe(select(selectNewCompany));
    this.salesmanObs = this._store.pipe(select(selectSalesman));
    this.listOfDescriptionsWithAmountObs = this._store.pipe(select(selectDescriptionsWithAmount));
    this.giftIndexListObs = this._store.pipe(select(selectGiftIndexList));
    this.selectedTypeOfBuyingObs = this._store.pipe(select(selectTypeOfBuying));
    this.creditDataObs = this._store.pipe(select(selectCredit));
    this.creditNeedsToBeRecalculatedObs = this._store.pipe(select(selectCreditNeedsToBeRecalculated));
    this.descriptionListObs = this._store.pipe(select(selectRemarks));
    this.searchParameters$ = this._store.pipe(select(selectSearchParameters));

    //subscriptions

    this.selectedCarsAndQuantity$.subscribe(selectedCarsAndQuantity => {
      if (null != selectedCarsAndQuantity) {
        this.selectedCars = selectedCarsAndQuantity.cars;
        if (null != this.selectedCars) {
          //get info whether the search was for sold or active cars by checking the first item of the car list
          const sold = this.selectedCars[0].sold
          sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
          this.numberOfPages = Math.floor(selectedCarsAndQuantity.quantity / Constants.PAGE_LIMIT);
          if (null != this.searchParameters) {
            this.searchParameters.totalQuantity = selectedCarsAndQuantity.quantity;
          } else {
            this.searchParameters = new SearchParameters(
              Constants.NULL_CAR_SEARCH_TEXT,
              Constants.NULL_SELECTED_FILTER_TYPE,
              Constants.NULL_IS_SOLD,
              Constants.NULL_PAGE_NUMBER,
              selectedCarsAndQuantity.quantity
            )
          }
          sessionStorage.setItem('searchParameters', JSON.stringify(this.searchParameters));
        }
      }
    });

    this.clickedCarIndexObs.subscribe(clickedCarIndex => {
      this.clickedCarIndex = clickedCarIndex;
      if (null != this.clickedCarIndex) {
        sessionStorage.setItem('clickedCarIndex', this.clickedCarIndex.toString());
      }
    });

    this.carOfTransactionObs.subscribe(carOfTransaction => {
      this.carOfTransaction = carOfTransaction;
    });

    this.carErrorObs.subscribe(errorMsg => {
      if (null !== errorMsg) {
        const action = 'Hiba :('
        this.utilService.openSnackBar(errorMsg, action);
      }
    });

    this.orderErrorObs.subscribe(errorMsg => {
      if (null !== errorMsg) {
        const action = 'Hiba :('
        this.utilService.openSnackBar(errorMsg, action);
      }
    });

    this.inheritanceTaxErrorObs.subscribe(errorMsg => {
      if (null !== errorMsg) {
        const action = 'Hiba :('
        this.utilService.openSnackBar(errorMsg, action);
      }
    });

    this.previousOrNewObs.subscribe(previousOrNew => {
      this.previousOrNew = previousOrNew;
    });

    this.individualOrCorporateObs.subscribe(individualOrCorporate => {
      this.individualOrCorporate = individualOrCorporate;
    });

    this.askForInheritanceTaxCalculationObs.subscribe(askForInheritanceTaxCalculation => {
      this.askForInheritanceTaxCalculation = askForInheritanceTaxCalculation;
      if (null != this.askForInheritanceTaxCalculation) {
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 3, 3);
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    });

    this.addCountInCarObs.subscribe(addCountInCar => {
      this.addCountInCar = addCountInCar;
    });

    this.orderProgressObs.subscribe(orderProgress => {
      this.orderProgress = orderProgress;
      if (null != orderProgress) {
        sessionStorage.setItem('orderProgress', this.orderProgress.toString());
      }
    });

    this.newOrderObs.subscribe(order => {
      this.newOrder = order;
      if (null != this.newOrder) {
        this.setAllOrderDataAfterHttpCall(this.newOrder, this.carOfTransaction);
        sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      }
    });

    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlreadyObs.subscribe(alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready => {
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
      if (null != this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
        this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready ?
          this._store.dispatch(new StorePreviousOrNew(Constants.NEW)) :
          this._store.dispatch(new StorePreviousOrNew(Constants.PREVIOUS));
      }

      if (null != alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
        sessionStorage.setItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready', this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready.toString());
      }
    });

    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporateObs.subscribe(selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate => {
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate;
      if (null != this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate) {
        this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate ?
          this._store.dispatch(new StoreIndividualOrCorporate(Constants.INDIVIDUAL)) :
          this._store.dispatch(new StoreIndividualOrCorporate(Constants.CORPORATE));
      }

      if (null != selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate) {
        sessionStorage.setItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate', this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate.toString());
      }
    });

    this.wantInheritanceTaxCalculationObs.subscribe(wantInheritanceTaxCalculation => {
      this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
      if (null != this.wantInheritanceTaxCalculation) {
        this.wantInheritanceTaxCalculation ?
          this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.WANT_CALCULATION)) :
          this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.DONT_WANT_CALCULATION));
      }

      if (null != wantInheritanceTaxCalculation) {
        sessionStorage.setItem('wantInheritanceTaxCalculation', this.wantInheritanceTaxCalculation.toString());
      }
    });

    this.thereIsCountInCarObs.subscribe(thereIsCountInCar => {
      this.thereIsCountInCar = thereIsCountInCar;
      if (null != this.thereIsCountInCar) {
        if (this.thereIsCountInCar) {
          this._store.dispatch(new StoreAddCountInCar(Constants.COUNT_IN));
          this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 5, 3);
          this.setOrderProgressInSessionStorage(this.orderProgress);
        } else {
          this._store.dispatch(new StoreAddCountInCar(Constants.NO_COUNT_IN));
          this._store.dispatch(new StoreCountInCar(null));
          this._store.dispatch(new StoreCountInCarSupplement(null));
          this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 5, 5);
          this.setOrderProgressInSessionStorage(this.orderProgress);
        }
      }

      if (null != thereIsCountInCar) {
        sessionStorage.setItem('thereIsCountInCar', this.thereIsCountInCar.toString());
      }
    });

    this.userSearchResultObs.subscribe(userSearchData => {
      this.userSearchResult.data = userSearchData;
      if (null != userSearchData) {
        sessionStorage.setItem('userSearchData', JSON.stringify(userSearchData));
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 2, 2);
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    });

    this.pickedUserObs.subscribe(pickedUser => {
      this.pickedUser = pickedUser;
      if (null != pickedUser) {
        sessionStorage.setItem('pickedUser', JSON.stringify(pickedUser));
      }
    });

    this.indexOfPickedUserObs.subscribe(index => {
      this.indexOfPickedUser = index;
      if (null != index) {
        sessionStorage.setItem('indexOfPickedUser', index.toString());
      }
    });

    this.companySearchResultObs.subscribe(companySearchData => {
      this.companySearchResult.data = companySearchData;
      if (null != companySearchData) {
        sessionStorage.setItem('companySearchData', JSON.stringify(companySearchData));
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 2, 2);
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    });

    this.pickedCompanyObs.subscribe(pickedCompany => {
      this.pickedCompany = pickedCompany;
      if (null != pickedCompany) {
        sessionStorage.setItem('pickedCompany', JSON.stringify(pickedCompany));
      }
    });

    this.indexOfPickedCompanyObs.subscribe(index => {
      this.indexOfPickedCompany = index;
      if (null != index) {
        sessionStorage.setItem('indexOfPickedCompany', index.toString());
      }
    });

    this.inheritanceTaxObs.subscribe(inheritanceTax => {
      this.inheritanceTax = inheritanceTax;
      if (null != inheritanceTax) {
        sessionStorage.setItem('inheritanceTax', this.inheritanceTax.toString());
      }
    });

    this.countInCarObs.subscribe(countInCar => {
      this.countInCar = countInCar;
      if (null != countInCar) {
        sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
      }
    });

    this.countInCarSupplementObs.subscribe(countInCarSupplement => {
      this.countInCarSupplement = countInCarSupplement;
      if (null != countInCarSupplement) {
        sessionStorage.setItem('countInCarSupplement', JSON.stringify(this.countInCarSupplement));
      }
    });

    this.downPaymentObs.subscribe(downPayment => {
      this.downPayment = downPayment;
      if (null != downPayment) {
        sessionStorage.setItem('downPayment', this.downPayment.toString());
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 6, 6);
        this.setOrderProgressInSessionStorage(this.orderProgress);
        this.createDownPaymentFormWithData(this.downPayment, this.extra);
        if (null != this.newOrder) {
          this.newOrder.downPayment = this.downPayment;
          sessionStorage.setItem('order', JSON.stringify(this.newOrder));
        }
      } else {
        sessionStorage.removeItem('downPayment');
        this.createDownPaymentFormWithData(Constants.NULL_DOWN_PAYMENT, this.extra);
      }
    });

    this.extraObs.subscribe(extra => {
      this.extra = extra;
      if (null != extra) {
        if (null != this.newOrder) {
          this.newOrder.extra = this.extra;
          sessionStorage.setItem('order', JSON.stringify(this.newOrder));
        }
        sessionStorage.setItem('extra', this.extra.toString());
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 6, 6);
        this.setOrderProgressInSessionStorage(this.orderProgress);
        this.createDownPaymentFormWithData(this.downPayment, this.extra);
      } else {
        sessionStorage.removeItem('extra');
        this.createDownPaymentFormWithData(this.downPayment, Constants.NULL_EXTRA_PAYMENT);
      }
    });

    this.newUserObs.subscribe(newUser => {
      this.newUser = newUser;
      if (null != newUser) {
        sessionStorage.setItem('newUserDuringSell', JSON.stringify(this.newUser));
      }
    });

    this.newCompanyObs.subscribe(newCompany => {
      this.newCompany = newCompany;
      if (null != newCompany) {
        sessionStorage.setItem('newCompanyDuringSell', JSON.stringify(this.newCompany));
      }
    });

    this.salesmanObs.subscribe(salesman => {
      this.salesman = salesman;
      if (null != salesman) {
        sessionStorage.setItem('salesman', salesman);
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 7, 7);
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    });

    this.descriptionListObs.subscribe(remarks => {
      this.descriptionList = remarks;
      if (null != remarks) {
        sessionStorage.setItem('descriptionList', JSON.stringify(this.descriptionList));
      }
    });

    this.listOfDescriptionsWithAmountObs.subscribe( descriptionsWithAmount => {
      this.listOfDescriptionsWithAmount = descriptionsWithAmount;
      if (null != descriptionsWithAmount) {
        sessionStorage.setItem('descriptionsWithAmount', JSON.stringify(this.listOfDescriptionsWithAmount));
        sessionStorage.setItem('giftIndexList', JSON.stringify(this.giftIndexList));
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 9, 9);
        this.setOrderProgressInSessionStorage(this.orderProgress);
        this.createFormGroupForDescriptionWithAmount();
      }
    });

    this.giftIndexListObs.subscribe(giftIndexList => {
      this.giftIndexList = giftIndexList;
      if (null != giftIndexList) {
        sessionStorage.setItem('giftIndexList', JSON.stringify(this.giftIndexList));
      }
    });

    this.selectedTypeOfBuyingObs.subscribe(typeOfBuying => {
      this.selectedTypeOfBuying = typeOfBuying;
      if (null != typeOfBuying) {
        sessionStorage.setItem('selectedTypeOfBuying', this.selectedTypeOfBuying);
        this.orderProgress = this.utilService.getRelevantOrderProgress(this.orderProgress, 10, 10);
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    });

    this.creditDataObs.subscribe(credit => {
      this.creditData = credit;
      if (null != credit) {
        sessionStorage.setItem('credit', JSON.stringify(credit));
      }
    });

    this.creditNeedsToBeRecalculatedObs.subscribe(creditNeedsToBeRecalculated => {
      this.creditNeedsToBeRecalculated = creditNeedsToBeRecalculated;
      if (null != creditNeedsToBeRecalculated) {
        sessionStorage.setItem('creditNeedsToBeRecalculated', JSON.stringify(creditNeedsToBeRecalculated));
      }
    });

    this.searchParameters$.subscribe(searchParameters => {
      this.searchParameters = searchParameters;
      if (null != this.searchParameters) {
        sessionStorage.setItem('searchParameters', JSON.stringify(this.searchParameters));
        this.numberOfPages = Math.floor(this.searchParameters.totalQuantity / Constants.PAGE_LIMIT);
        this.recentPage = this.searchParameters.page;
      }
    });
  }

  // Retrieve all the data after refresh

  private getDataFromSessionStorageAfterRefresh() {
    if (sessionStorage.getItem('orderProgress')) {
      this._store.dispatch(new UpdateOrderProgress(Number(sessionStorage.getItem('orderProgress'))));
    }
    if (sessionStorage.getItem('inheritanceTax')) {
      this._store.dispatch(new GetInheritanceTaxSuccess(Number(sessionStorage.getItem('inheritanceTax'))));
    }
    if (sessionStorage.getItem('userSearchData')) {
      this._store.dispatch(new GetUsersSuccess(JSON.parse(sessionStorage.getItem('userSearchData'))));
    }
    if (sessionStorage.getItem('companySearchData')) {
      this._store.dispatch(new GetCompaniesSuccess(JSON.parse(sessionStorage.getItem('companySearchData'))));
    }
    if (sessionStorage.getItem('indexOfPickedUser')) {
      this._store.dispatch(new StorePickedUserIndex(Number(sessionStorage.getItem('indexOfPickedUser'))));
    }
    if (sessionStorage.getItem('indexOfPickedCompany')) {
      this._store.dispatch(new StorePickedCompanyIndex(Number(sessionStorage.getItem('indexOfPickedCompany'))));
    }
    if (sessionStorage.getItem('pickedUser')) {
      this._store.dispatch(new StorePickedUser(JSON.parse(sessionStorage.getItem('pickedUser'))));
    }
    if (sessionStorage.getItem('newUserDuringSell')) {
      this._store.dispatch(new StoreNewUser(JSON.parse(sessionStorage.getItem('newUserDuringSell'))));
    }
    if (sessionStorage.getItem('pickedCompany')) {
      this._store.dispatch(new StorePickedCompany(JSON.parse(sessionStorage.getItem('pickedCompany'))));
    }
    if (sessionStorage.getItem('newCompanyDuringSell')) {
      this._store.dispatch(new StoreNewCompany(JSON.parse(sessionStorage.getItem('newCompanyDuringSell'))));
    }
    if (sessionStorage.getItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready')) {
      this._store.dispatch(new StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready(JSON.parse(sessionStorage.getItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready'))))
    }
    if (sessionStorage.getItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate')) {
      this._store.dispatch(new StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate(JSON.parse(sessionStorage.getItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate'))));
    }
    if (sessionStorage.getItem('wantInheritanceTaxCalculation')) {
      this._store.dispatch(new StoreWantInheritanceTaxCalculation(JSON.parse(sessionStorage.getItem('wantInheritanceTaxCalculation'))));
    }
    if (sessionStorage.getItem('thereIsCountInCar')) {
      this._store.dispatch(new StoreThereIsCountInCar(JSON.parse(sessionStorage.getItem('thereIsCountInCar'))));
    }
    if (sessionStorage.getItem('countInCar')) {
      this._store.dispatch(new StoreCountInCar(JSON.parse(sessionStorage.getItem('countInCar'))));
    }
    if (sessionStorage.getItem('countInCarSupplement')) {
      this._store.dispatch(new StoreCountInCarSupplement(JSON.parse(sessionStorage.getItem('countInCarSupplement'))));
    }
    if (sessionStorage.getItem('downPayment')) {
      this._store.dispatch(new StoreDownPayment(Number(sessionStorage.getItem('downPayment'))));
    }
    if (sessionStorage.getItem('descriptionList')) {
      this.descriptionList = JSON.parse(sessionStorage.getItem('descriptionList'));
    }
    if (sessionStorage.getItem('extra')) {
      this._store.dispatch(new StoreExtraPayment(Number(sessionStorage.getItem('extra'))));
    }
    if (sessionStorage.getItem('descriptionsWithAmount')) {
      const descriptionsWithAmountList = JSON.parse(sessionStorage.getItem('descriptionsWithAmount'))
      descriptionsWithAmountList.forEach((item, index) => {
        const descriptionWithAmountRequest = new UpdateDescriptionWithAmountRequest(index, item);
        this._store.dispatch(new UpdateDescriptionWithAmount(descriptionWithAmountRequest));
      })
    }
    if (sessionStorage.getItem('giftIndexList')) {
      this._store.dispatch(new StoreGiftIndexListSuccess(JSON.parse(sessionStorage.getItem('giftIndexList'))));
    }
    if (sessionStorage.getItem('selectedTypeOfBuying')) {
      this._store.dispatch(new StoreTypeOfBuying(sessionStorage.getItem('selectedTypeOfBuying')));
    }
    if (sessionStorage.getItem('salesman')) {
      this._store.dispatch(new StoreSalesman(sessionStorage.getItem('salesman')));
    }
    if (sessionStorage.getItem('credit')) {
      this._store.dispatch(new StoreCredit(JSON.parse(sessionStorage.getItem('credit'))));
    }
    if (sessionStorage.getItem('creditNeedsToBeRecalculated')) {
      this._store.dispatch(new StoreCreditNeedsToBeRecalculated(JSON.parse(sessionStorage.getItem('creditNeedsToBeRecalculated'))));
    }
    if (sessionStorage.getItem('selectedOrganizer')) {
      this.selectedOrganizer = JSON.parse(sessionStorage.getItem('selectedOrganizer'));
    }
    if (sessionStorage.getItem('searchParameters')) {
      this._store.dispatch(new UpdateSearchParameters(JSON.parse(sessionStorage.getItem('searchParameters'))));
    }
  }

  // Remove all the items from sessionStorage when other order or other route was clicked

  private removeItemsFromSessionStorage() {
    sessionStorage.removeItem('clickedCarIndex');
    sessionStorage.removeItem('order');
    sessionStorage.removeItem('userSearchData');
    sessionStorage.removeItem('companySearchData');
    sessionStorage.removeItem('indexOfPickedUser');
    sessionStorage.removeItem('indexOfPickedCompany');
    sessionStorage.removeItem('pickedUser');
    sessionStorage.removeItem('pickedCompany');
    sessionStorage.removeItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready');
    sessionStorage.removeItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate');
    sessionStorage.removeItem('wantInheritanceTaxCalculation');
    sessionStorage.removeItem('thereIsCountInCar');
    sessionStorage.removeItem('downPayment');
    sessionStorage.removeItem('extra');
    sessionStorage.removeItem('descriptionsWithAmount');
    sessionStorage.removeItem('giftIndexList');
    sessionStorage.removeItem('selectedTypeOfBuying');
    sessionStorage.removeItem('salesman');
    sessionStorage.removeItem('countInCarSupplement');
    sessionStorage.removeItem('countInCar');
    sessionStorage.removeItem('inheritanceTax');
    sessionStorage.removeItem('orderedCar');
    sessionStorage.removeItem('descriptionList');
    sessionStorage.removeItem('insuranceOfferNumber');
    sessionStorage.removeItem('credit');
    sessionStorage.removeItem('a2representation');
    sessionStorage.removeItem('switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer');
    sessionStorage.removeItem('warrantType');
    sessionStorage.removeItem('witness1');
    sessionStorage.removeItem('witness2');
    sessionStorage.removeItem('newUserDuringSell');
    sessionStorage.removeItem('newCompanyDuringSell');
    sessionStorage.removeItem('a2Representation');
    sessionStorage.removeItem('typeOfBuying');
    sessionStorage.removeItem('url');
    sessionStorage.removeItem('trophyClick');
    sessionStorage.removeItem('creditNeedsToBeRecalculated');
    sessionStorage.removeItem('companySearchDataOnCompanyPage');
    sessionStorage.removeItem('pickedCompanyOnCompanyPage');
    sessionStorage.removeItem('indexOfPickedCompanyOnCompanyPage');
    sessionStorage.removeItem('userSearchDataOnCompanyPage');
    sessionStorage.removeItem('pickedUserOnUserPage');
    sessionStorage.removeItem('indexOfPickedUserOnUserPage');
  }

  // Sets the data to null when expansion order is collapsed

  private setDataToNull(carIndex: number) {
    this._store.dispatch(new StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready(null));
    this._store.dispatch(new StorePreviousOrNew(null));
    this._store.dispatch(new StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate(null));
    this._store.dispatch(new StoreIndividualOrCorporate(null));
    this._store.dispatch(new GetUsersSuccess(null));
    this._store.dispatch(new GetCompaniesSuccess(null));
    this._store.dispatch(new StorePickedUser(null));
    this._store.dispatch(new StoreNewUser(null));
    this._store.dispatch(new StorePickedUserIndex(null));
    this._store.dispatch(new StorePickedCompany(null));
    this._store.dispatch(new StoreNewCompany(null));
    this._store.dispatch(new StorePickedCompanyIndex(null));
    this.selectedUserFilter = null;
    this.selectedCompanyFilter = null;
    this._store.dispatch(new StoreWantInheritanceTaxCalculation(null));
    this._store.dispatch(new StoreAskForInheritanceTaxCalculation(null));
    this._store.dispatch(new StoreThereIsCountInCar(null));
    this._store.dispatch(new StoreAddCountInCar(null));
    this._store.dispatch(new StoreDownPayment(null));
    this.createEmptyDownPaymentForm();
    this.descriptionList = [];
    this.description = null;
    this.descriptions = null;
    this._store.dispatch(new StoreGiftIndexListSuccess([]));
    this._store.dispatch(new StoreDescriptionsWithAmount([]));
    this.createFormGroupForDescriptionWithAmount();
    this.createEmptyCarSupplementForm();
    this._store.dispatch(new StoreExtraPayment(null));
    this._store.dispatch(new StoreSalesman(null));
    this._store.dispatch(new StoreTypeOfBuying(null));
    if (this.newOrder != null && this.newOrder.id == null) {
      const carUpdateRequest = new CarUpdateModel(
        Constants.NULL_NAME_OF_BUYER,
        Constants.NULL_SALESMAN,
        this.clickedCarIndex,
        Constants.NULL_CAR_HAND_OVER_DATE,
        Constants.NULL_CAR_TYPE_OF_BUYING);
      this._store.dispatch(new StoreNameOfBuyer(carUpdateRequest));
      this._store.dispatch(new UpdateCarSalesman(carUpdateRequest));
      this._store.dispatch(new UpdateCarTypeOfBuying(carUpdateRequest));
      this._store.dispatch(new UpdateCarHandOverDate(carUpdateRequest));
    }
    this._store.dispatch(new GetInheritanceTaxSuccess(null));
    this._store.dispatch(new UpdateOrder(null));
    this._store.dispatch(new StoreCountInCar(null));
    this._store.dispatch(new StoreCountInCarSupplement(null));
    this.setOrderProgressInSessionStorage(0);
    this.removeItemsFromSessionStorage();
    this._store.dispatch(new StoreCredit(null));
    this._store.dispatch(new StoreCreditNeedsToBeRecalculated(false));
    if (Constants.NO_CAR_INDEX !== carIndex) {
      this._store.dispatch(new StoreNameOfBuyer(
        new CarUpdateModel(
          Constants.NULL_NAME_OF_BUYER,
          Constants.NULL_SALESMAN,
          carIndex,
          Constants.NULL_CAR_HAND_OVER_DATE,
          Constants.NULL_CAR_TYPE_OF_BUYING)));
    }
  }

  // Sets variables regarding the order for the component

  private setFilterComponentVariablesAccordingToOrder(order: Order) {
    this.setOrderProgressInSessionStorage(10);

    if (order.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
      this.previousOrNew = 'new';
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = true;
    } else {
      this.previousOrNew = 'previous';
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = false;
    }
    sessionStorage.setItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready', this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready.toString());
    if (order.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate) {
      this.individualOrCorporate = 'individual';
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = true;
    } else {
      this.individualOrCorporate = 'corporate';
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = false;
    }
    sessionStorage.setItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate', this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate.toString());
    if (order.wantInheritanceTaxCalculation) {
      this.askForInheritanceTaxCalculation = 'wantCalculation';
      this.wantInheritanceTaxCalculation = true;
    } else {
      this.askForInheritanceTaxCalculation = 'dontWantCalculation';
      this.wantInheritanceTaxCalculation = false;
    }
    sessionStorage.setItem('wantInheritanceTaxCalculation', this.wantInheritanceTaxCalculation.toString());
    if (order.inheritanceTax != null) {
      this.inheritanceTax = order.inheritanceTax;
      sessionStorage.setItem('inheritanceTax', this.inheritanceTax.toString());
    }
    if (order.thereIsCountInCar) {
      this.addCountInCar = 'countIn';
      this.thereIsCountInCar = true;
      this.httpService.getSingleCarById(order.countInCarId.toString()).subscribe(data => {
        this.countInCar = data;
      });
    } else {
      this.addCountInCar = 'noCountIn';
      this.thereIsCountInCar = false;
    }
    sessionStorage.setItem('thereIsCountInCar', this.thereIsCountInCar.toString());
    if (order.countInCarSupplement != null) {
      this.countInCarSupplement = order.countInCarSupplement;
    }
    if (order.downPayment != null) {
      this.downPayment = order.downPayment;
      sessionStorage.setItem('downPayment', this.downPayment.toString());
    }
    if (order.extra != null) {
      this.extra = order.extra;
      sessionStorage.setItem('extra', this.extra.toString());
    }
    if (order.credit != null) {
      this.creditData = order.credit;
      sessionStorage.setItem('credit', JSON.stringify(this.creditData));
    }
    if (order.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
      if (order.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate) {
        this.newUser = order.users;
        sessionStorage.setItem('newUserDuringSell', JSON.stringify(this.newUser));
      } else {
        this.newCompany = order.company;
        sessionStorage.setItem('newCompanyDuringSell', JSON.stringify(this.newCompany));
      }
    } else {
      if (order.users != null) {
        let userList: Users[] = [];
        userList.push(order.users);
        this.userSearchResult.data = userList;
        sessionStorage.setItem('userSearchData', JSON.stringify(userList));
        this.indexOfPickedUser = 0;
        sessionStorage.setItem('indexOfPickedUser', this.indexOfPickedUser.toString());
        this.pickedUser = order.users;
        sessionStorage.setItem('pickedUser', JSON.stringify(this.pickedUser));
      }
      if (order.company != null) {
        let companyList: Company[] = [];
        companyList.push(order.company);
        this.companySearchResult.data = companyList;
        sessionStorage.setItem('companySearchData', JSON.stringify(companyList));
        this.indexOfPickedCompany = 0;
        sessionStorage.setItem('indexOfPickedCompany', this.indexOfPickedCompany.toString());
        this.pickedCompany = order.company;
        sessionStorage.setItem('pickedCompany', JSON.stringify(this.pickedCompany));
      }
    }
    this.selectedTypeOfBuying = order.selectedTypeOfBuying;
    this.salesman = this.carOfTransaction.salesman;
    if (order.description != null) {
      this.descriptionList = order.description;
    }
    if (order.descriptionsWithAmount != null) {
      this.listOfDescriptionsWithAmount = order.descriptionsWithAmount;
      this.listOfDescriptionsWithAmount.forEach((descriptionWithAmount, index) => {
        if (descriptionWithAmount.charged == 'AJÁNDÉK') {
          this.giftIndexList.push(index);
        }
      });
      this.setDescriptionForm();
    }
  }

  // Description form

  private createFormGroupForDescriptionWithAmount() {
    if (this.listOfDescriptionsWithAmount.length === 0) {
      this.descriptionForm = this.formBuilder.group({
        description: this.formBuilder.array([this.createDescriptionWithAmountRow(null)])
      });
    } else {
      this.setDescriptionForm();
    }
  }

  private setDescriptionForm() {
    this.descriptionForm = this.formBuilder.group({
      description: this.formBuilder.array([]),
    });
    this.listOfDescriptionsWithAmount.forEach(descriptionWithAmount => {
      this.addNewDescriptionWithAmountRow(descriptionWithAmount);
    });
  }

  private createDescriptionWithAmountRow(descriptionWithAmount: DescriptionWithAmount) {
    if (descriptionWithAmount == null) {
      return this.formBuilder.group({
        id: [null],
        descriptionText: [null],
        charged: [null],
        amount: [null],
      });
    } else {
      return this.formBuilder.group({
        id: [descriptionWithAmount.id],
        descriptionText: [descriptionWithAmount.description],
        charged: [descriptionWithAmount.charged],
        amount: [descriptionWithAmount.amount],
      });
    }
  }

  public addNewDescriptionWithAmountRow(descriptionWithAmount: DescriptionWithAmount) {
    this.descriptions = this.descriptionForm.get('description') as FormArray;
    this.descriptions.push(this.createDescriptionWithAmountRow(descriptionWithAmount));
  }

  public removeDescriptionWithAmountRow(index: number) {
    if (this.giftIndexList.includes(index)) {
      this._store.dispatch(new StoreGiftIndexList(
        new UpdateGiftIndexListRequest(
          index,
          Constants.IT_IS_NOT_ADDING,
          Constants.IT_IS_DESCRIPTION_DELETE)));
    }
    this._store.dispatch(new RemoveDescriptionWithAmount(index));
  }

  //Count In Car Supplement form

  private setCountInCarSupplementForm(countInCarSupplement: CountInCarSupplement) {
    this.countInCarSupplementForm = this.formBuilder.group({
      countInPrice: [countInCarSupplement.countInPrice],
      previousLoan: [countInCarSupplement.previousLoan],
      previousBank: [countInCarSupplement.previousBank],
      loanType: [countInCarSupplement.loanType],
    });
  }

  private createEmptyCarSupplementForm() {
    this.countInCarSupplementForm = this.formBuilder.group({
      countInPrice: [null],
      previousLoan: [null],
      previousBank: [null],
      loanType: [null],
    });
  }

  //Down payment form

  private createEmptyDownPaymentForm() {
    this.downPaymentForm = this.formBuilder.group({
      downPayment: [null],
      extra: [null],
    });
  }

  private createDownPaymentFormWithData(downPayment: number, extra: number) {
    this.downPaymentForm = this.formBuilder.group({
      downPayment: [downPayment],
      extra: [extra],
    });
  }

  // Checks the value of the selectedFilter and the secondarySelectedFilter
  // if the value of the selectedFilter is not 'sold' than the secondarySelectedFilter has to be null

  public checkSelectedFilter() {
    this.clickedCarIndex = null;
    sessionStorage.removeItem('clickedCarIndex');
    if ('sold' !== this.selectedFilter.value && this.secondarySelectedFilter != null) {
      this.secondarySelectedFilter = null;
    }
  }

  public checkSelectedOrganizer() {
    const selectedDirection = this.selectedOrganizer.direction;
    const organizerType = this.selectedOrganizer.value;
    this.goToPage(1);
    //this.sortSelectedCars(this.selectedCars, organizerType, selectedDirection);
    //sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
    sessionStorage.setItem('selectedOrganizer', JSON.stringify(this.selectedOrganizer));
  }

  private sortSelectedCars(selectedCars: Car[], sortBy: string, direction: Direction) {
    selectedCars.sort(function(a, b) {
      switch (sortBy) {
        case 'type':
          const typeA = a.type;
          const typeB = b.type;
          switch (direction) {
            case Direction.up:
              return (typeA < typeB) ? -1 : (typeA > typeB) ? 1 : 0;
            case Direction.down:
              return (typeA < typeB) ? 1 : (typeA > typeB) ? -1 : 0;
          }
          break;
        case 'name':
          const nameA = a.name;
          const nameB = b.name;
          switch (direction) {
            case Direction.up:
              return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            case Direction.down:
              return (nameA < nameB) ? 1 : (nameA > nameB) ? -1 : 0;
          }
          break;
        case 'plateNumber':
          const plateNumberA = a.plateNumber;
          const plateNumberB = b.plateNumber;
          switch (direction) {
            case Direction.up:
              return (plateNumberA < plateNumberB) ? -1 : (plateNumberA > plateNumberB) ? 1 : 0;
            case Direction.down:
              return (plateNumberA < plateNumberB) ? 1 : (plateNumberA > plateNumberB) ? -1 : 0;
          }
          break;
        case 'buyer':
          const buyerA = a.nameOfBuyer;
          const buyerB = b.nameOfBuyer;
          switch (direction) {
            case Direction.up:
              return (buyerA < buyerB) ? -1 : (buyerA > buyerB) ? 1 : 0;
            case Direction.down:
              return (buyerA < buyerB) ? 1 : (buyerA > buyerB) ? -1 : 0;
          }
          break;
      }

    });
  }

  // Filters cars in filter component by model, type or plate number.
  // Validates the length of the input, the plate number, wether if the input field is an empty field.
  // Clears the session storage.
  // Convert the form values to uppercase.
  // If the selection filter is 'plateNumber', then it gets a single car object
  // If the selection filter is 'all', then it gets all the car objects.
  // If the selection filter is 'name' or 'type', then it can get one or multiple car objects.
  // If the selection filter is 'sold', then a secondary filter steps up and then
  // we can get one or multiple cars back.
  // The getSingleCar call gets called through the http.service.ts with three parameters,
  // the first is the actual string searched in that type,
  // the second is the name of the search type eg.: 'type', 'name', 'plateNumber'
  // the third is the isSold, which helps distinguish between sold and active cars.
  // The getAllCars method gets called in the same service

  public filterCars(form: any) {
    this.selectedOrganizer = null;
    this.numberOfPages = 0;
    this.recentPage = 1;
    if (this.validateFormFieldLength(form.value)) {
      this.clearSelectedCars();
      if (form.value.plateNumber
        && form.value.plateNumber.length < 6 ) {
        this.utilService.validPlateNumber = false;
        this.utilService.emptySearchField = false;
      } else if (this.selectedFilter.value === 'name' && form.value.name != null && form.value.name.length === 0
        || this.selectedFilter.value === 'type' && form.value.type != null && form.value.type.length === 0
        || this.selectedFilter.value === 'plateNumber' && form.value.plateNumber != null && form.value.plateNumber.length === 0
        || this.secondarySelectedFilter != null && this.secondarySelectedFilter.value === 'name' && form.value.name != null && form.value.name.length === 0
        || this.secondarySelectedFilter != null && this.secondarySelectedFilter.value === 'type' && form.value.type != null && form.value.type.length === 0
        || this.secondarySelectedFilter != null && this.secondarySelectedFilter.value === 'plateNumber' && form.value.plateNumber != null && form.value.plateNumber.length === 0) {
        this.utilService.emptySearchField = true;
      } else {
        sessionStorage.clear();
        let carSearchText = null;
        this.utilService.validPlateNumber = true;
        this.utilService.emptySearchField = false;
        switch (Object.keys(form.value)[0]) {
          case 'name': {
            carSearchText = form.value.name.toUpperCase();
            break;
          }
          case 'type': {
            carSearchText = form.value.type.toUpperCase();
            break;
          }
          case 'plateNumber': {
            carSearchText = form.value.plateNumber.toUpperCase();
            break;
          }
        }

        if (this.selectedFilter.value !== 'all') {
          const isSold = this.selectedFilter.value === 'sold';
          const selectedFilterType = isSold ? this.secondarySelectedFilter.value : this.selectedFilter.value;
          const carFilterRequest = new CarFilterRequest(
            carSearchText,
            selectedFilterType,
            isSold,
            Constants.PAGE_LIMIT,
            Constants.FIRST_PAGE_OFFSET,
            Constants.NULL_ORDER_BY,
            Constants.NULL_ORDER_DIRECTION
          );
          const searchParameters = new SearchParameters(carSearchText, selectedFilterType, isSold, 1, Constants.SELECTED_CARS_QUANTITY_NOT_KNOWN_YET)
          this._store.dispatch(new UpdateSearchParameters(searchParameters));
          this._store.dispatch(new GetFilteredCars(carFilterRequest));
        } else {
          this.getAllCars(false);
        }
      }
    }
  }

  // It uses the http.service.ts to retrieve all the car objects through http call.
  // The only parameter it gets is allOrSold with the value of 'all'.

  public getAllCars(isSold: boolean) {
    this.clickedCarIndex = null;
    this.selectedOrganizer = null;
    sessionStorage.removeItem('clickedCarIndex');
    this.clearSelectedCars();
    const carFilterRequest = new CarFilterRequest(
      Constants.NULL_CAR_SEARCH_TEXT,
      Constants.NULL_SELECTED_FILTER_TYPE,
      isSold,
      Constants.PAGE_LIMIT,
      Constants.FIRST_PAGE_OFFSET,
      Constants.NULL_ORDER_BY,
      Constants.NULL_ORDER_DIRECTION
    );
    const searchParameters = new SearchParameters(null, null, isSold, 1, Constants.SELECTED_CARS_QUANTITY_NOT_KNOWN_YET);
    this._store.dispatch(new UpdateSearchParameters(searchParameters));
    this._store.dispatch(new GetCars(carFilterRequest));
  }

  // This is the modal section.
  // 5 modals are declared here at the moment. Most likely the number gets bigger :)

  // The first modal is the car update modal which is helpful when we want to edit the saved and listed cars.
  // This method sets all the configurations for the dialog and injects the DialogComponent in here.
  // After the dialog was closed it sets the updated car as a carOfTransaction
  // and updates the list of selected cars as well

  public openUpdateModal(car: Car, index: number): void {
    this.utilService.carUpdate = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.data = car;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.utilService.carUpdate = false;
      if (result == null) {
        sessionStorage.removeItem('newCar');
      }
      if (this.carOfTransaction != null) {
        this.carOfTransaction = result;
      }
      // if (null != this.nameOfBuyer && null != this.carOfTransaction) {
      //   this.carOfTransaction.nameOfBuyer = this.nameOfBuyer;
      // }
      if (null != this.carOfTransaction) {
        this.selectedCars[this.clickedCarIndex] = this.carOfTransaction;
        sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
      } else if (null != result) {
        this.selectedCars[index] = result;
        sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
      }
    });
  }

  // The second modal is the warning modal which warns us when we want to delete a car.
  // Basically it is just a double check to make sure that the deletion did happen on purpose.
  // This method sets all the configurations for the dialog and injects the WarningDialogComponent in here.
  // After the dialog was closed it depends whether the result is a carId.
  // If yes then the car with that id gets deleted.

  public openWarningModal(carId: any): void {
    const warningDialogConfig = new MatDialogConfig();

    warningDialogConfig.disableClose = true;
    warningDialogConfig.width = '30%';
    warningDialogConfig.data = carId;

    const dialogRef = this.dialog.open(WarningDialogComponent, warningDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === carId) {
        this.deleteCar(carId);
      }
    });
  }

  // The third modal is the credit form modal in which we can fill up the necessary data for getting credit.
  // This method sets all the configurations for the dialog and injects the CreditDialogComponent in here.
  // After the dialog was closed the result will be set as a creditData and will be part of the car order.

  public openCreditModal(car: Car): void {
    const creditDialogConfig = new MatDialogConfig();

    creditDialogConfig.disableClose = true;
    creditDialogConfig.width = '50%';
    creditDialogConfig.data = {
      car: car,
      countInCarSupplement: this.countInCarSupplement,
      downPayment: this.downPayment,
      extra: this.extra,
      credit: this.creditData,
    };

    const dialogRef = this.dialog.open(CreditDialogComponent, creditDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this._store.dispatch(new StoreCredit(result));
        this._store.dispatch(new StoreCreditNeedsToBeRecalculated(false));
      }
    });
  }

  // The fourth modal is the car time info form modal which opens right before the selling-buying document.
  // Many data gets collected here not just the timing information as the name of the dialog indicates it.
  // So don't let the name of the dialog misleading anybody.
  // Beside the timing info, the representateur of the A2-Autocentrum Kft gets chosen along with the witnesses.
  // Also some description can be added for the document
  // and in case of count in car a few data from the seller gets collected as well.
  // This method sets all the configurations for the dialog and injects the CarTimeInfoComponent in here.
  // The result contains the car object which is most likely modified and therefore the carOfTransaction needs to be updated.
  // The other part of the result is the description list which is going to take place on the document,
  // and needs to be saved as part of the order.
  // And finally the evaluateCarOfContract method gets called where actions will take place depends on the transaction
  // which can be sell or buy from the A2 company perspective.

  public openCarTimeInfoDialog(car: Car, orderedCarId: number, sellOrBuy: string, descriptionForm: FormGroup, countInCarSupplementForm: FormGroup) {
    const carTimeInfoDialogConfig = new MatDialogConfig();

    carTimeInfoDialogConfig.disableClose = true;
    carTimeInfoDialogConfig.width = '50%';

    carTimeInfoDialogConfig.data = {
      car: car,
      order: this.newOrder,
      sellOrBuy: sellOrBuy,
      clickedCarIndex: this.clickedCarIndex,
      selectedCars: this.selectedCars
    };

    const dialogRef = this.dialog.open(CarTimeInfoComponent, carTimeInfoDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.updateCarOfTransaction(result.car);
        if (result.remarkList != null) {
          this.reOrderDescriptionList(result, sellOrBuy);
        }
        this.evaluateCarOfContract(result, orderedCarId, descriptionForm, countInCarSupplementForm);
      }
    });
  }

  // The fifth modal is the witness picker modal where (not a miracle) you can pick witnesses.
  // This method sets all the configurations for the dialog and injects the WitnessPickerDialogComponent in here.
  // After the dialog was closed and the result is not null the clicked document gets generated.

  public openWitnessPickerModal(descriptionForm: FormGroup, countInCarSupplementForm: FormGroup): void {
    const witnessPickerDialogConfig = new MatDialogConfig();

    witnessPickerDialogConfig.disableClose = true;
    witnessPickerDialogConfig.width = '30%';

    const dialogRef = this.dialog.open(WitnessPickerDialogComponent, witnessPickerDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.navigateToOrderOrSellingOrWarrantOrInsurancePage(this.carOfTransaction, this.carOfTransaction.id, '/warrantPage', result.witness1, result.witness2, result.warrantType, null, descriptionForm, countInCarSupplementForm, null);
      }
    });
  }

  // Updates descriptions for selling-buying page

  private reOrderDescriptionList(result: any, sellOrBuy: string) {
    const newDescriptionList = [];
    const remarkList = result.remarkList;
    if (this.newOrder) {
      this.newOrder.description.forEach(description => {
        if (sellOrBuy === 'sell' && description.type === 'buy') {
          newDescriptionList.push(description);
        } else if (sellOrBuy === 'buy' && description.type === 'sell') {
          newDescriptionList.push(description);
        }
      });
    }
    newDescriptionList.push(...remarkList);
    this._store.dispatch(new StoreRemarks(newDescriptionList));
  }

  // Navigates to the clicked document and structure it depends on the transaction is sell or buy from the A2 company perspective.

  private evaluateCarOfContract(resultOfCarTimeInfoDialog: any, orderedCarId: number, descriptionForm: FormGroup, countInCarSupplementForm: FormGroup) {
    if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
      this.carOfTransaction = resultOfCarTimeInfoDialog.car;
      this.navigateToOrderOrSellingOrWarrantOrInsurancePage(this.carOfTransaction, orderedCarId, '/sellingPage', resultOfCarTimeInfoDialog.witness1, resultOfCarTimeInfoDialog.witness2, null, resultOfCarTimeInfoDialog.representation, descriptionForm, countInCarSupplementForm, resultOfCarTimeInfoDialog.typeOfBuying);
    } else {
      this.countInCar = resultOfCarTimeInfoDialog.car;
      this.navigateToOrderOrSellingOrWarrantOrInsurancePage(this.countInCar, orderedCarId, '/sellingPage', resultOfCarTimeInfoDialog.witness1, resultOfCarTimeInfoDialog.witness2, null, resultOfCarTimeInfoDialog.representation, descriptionForm, countInCarSupplementForm, resultOfCarTimeInfoDialog.typeOfBuying);
    }
  }

  // TODO: needs to move to utility service
  // Gives indexes for the items in ngFor loops, and enhances there performance.

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  // When a previous customer (private) wants to buy or sell a car
  // then the data about the customer gets retrieved from the database.
  // It has two parameters, the first is the value of the field, the second is the filter type.
  // The resulting data will also be part of the order.

  public filterUser(form: any) {
    if (this.validateFormFieldLength(form.value)) {
      this._store.dispatch(new GetUsers(new UserFilterRequest(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value)));
    }
  }

  // Selects user from userSearchResult
  // It has only one parameter which is a number(index).
  // After that the chosen user will be set as pickedUser and put into the sessionStorage
  // and will be saved as the part of the order
  // Also the nameOfBuyer variable is set for the car and updated in the database.
  // The nameOfBuyer play its part as a column value in the filter component

  public pickUser(index: number) {
    this._store.dispatch(new StorePickedUserIndex(index));
    const pickedUserFromDataTable = this.userSearchResult.data[index];
    this._store.dispatch(new StorePickedUser(
      new Users(
        pickedUserFromDataTable.id,
        pickedUserFromDataTable.fullName,
        pickedUserFromDataTable.birthName,
        pickedUserFromDataTable.zipCode,
        pickedUserFromDataTable.city,
        pickedUserFromDataTable.address,
        pickedUserFromDataTable.birthPlace,
        pickedUserFromDataTable.phoneNumber,
        pickedUserFromDataTable.email,
        pickedUserFromDataTable.nameOfMother,
        pickedUserFromDataTable.birthDate,
        pickedUserFromDataTable.personNumber,
        pickedUserFromDataTable.idCardNumber,
        pickedUserFromDataTable.dueTimeOfIdCard,
        pickedUserFromDataTable.drivingLicenceNumber,
        pickedUserFromDataTable.dueTimeOfDrivingLicence,
        pickedUserFromDataTable.taxNumber,
        pickedUserFromDataTable.healthcareNumber,
        pickedUserFromDataTable.nationality
      )));

    const carUpdateRequest = new CarUpdateModel(
      this.pickedUser.fullName,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new StoreNameOfBuyer(carUpdateRequest));
  }

  // When a previous customer (corporate) wants to buy or sell a car
  // then the data about the customer gets retrieved from the database.
  // It has two parameters, the first is the value of the field, the second is the filter type.
  // The resulting data will also be part of the order.

  public filterCompany(form: any) {
    if (this.validateFormFieldLength(form.value)) {
      this._store.dispatch(new GetCompanies(new CompanyFilterRequest(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value)));
    }
  }

  // Selects company from companySearchResult
  // It has only one parameter which is a number(index).
  // After that the chosen company will be set as pickedCompany and put into the sessionStorage
  // and will be saved as the part of the order
  // Also the nameOfBuyer variable is set and saved into sessionStorage
  // the nameOfBuyer play its part as a column value in the filter component

  public pickCompany(index: number) {
    this._store.dispatch(new StorePickedCompanyIndex(index));
    const pickedCompanyFromDataTable = this.companySearchResult.data[index];
    this._store.dispatch(new StorePickedCompany(
      new Company(
        pickedCompanyFromDataTable.id,
        pickedCompanyFromDataTable.name,
        pickedCompanyFromDataTable.address,
        pickedCompanyFromDataTable.companyRegistrationNumber,
        pickedCompanyFromDataTable.representation,
        pickedCompanyFromDataTable.taxNumber,
        pickedCompanyFromDataTable.phoneNumber,
        pickedCompanyFromDataTable.email
      )));

    const carUpdateRequest = new CarUpdateModel(
      this.pickedCompany.name,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new StoreNameOfBuyer(carUpdateRequest));
  }

  // Converts the values of the filter form into upper case values.

  private setFormValuesToUpperCase(form: any): string {
    let formValue = null;
    switch (Object.keys(form.value)[0]) {
      case 'name': {
        formValue = form.value.name.toUpperCase();
        break;
      }
      case 'city': {
        formValue = form.value.city.toUpperCase();
        break;
      }
      case 'companyRegistrationNumber': {
        formValue = form.value.companyRegistrationNumber.toUpperCase();
        break;
      }
    }
    return formValue;
  }

  // This section is all about checkboxes.

  // Basically it helps to coordinate the checkbox of the previous and new customer.
  // It has two parameters, the first is the previousOrNew which can have two values: 'previous', 'new'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public selectBetweenNewAndPreviousCustomer(previousOrNew: string, selection:boolean) {
    this.changeCheckBoxValuesToNull();
    if (previousOrNew === Constants.PREVIOUS) {
      this._store.dispatch(new StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready(!selection));
      selection ?
        this._store.dispatch(new StorePreviousOrNew(Constants.PREVIOUS)) :
        this._store.dispatch(new StorePreviousOrNew(Constants.NEW));
    } else if (previousOrNew === Constants.NEW) {
      this._store.dispatch(new StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready(selection));
      selection ?
        this._store.dispatch(new StorePreviousOrNew(Constants.NEW)) :
        this._store.dispatch(new StorePreviousOrNew(Constants.PREVIOUS));
    }
    this.orderProgress > 1 ?
      this._store.dispatch(new UpdateOrderProgress(this.orderProgress)) :
      this._store.dispatch(new UpdateOrderProgress(1));
    this.setOrderProgressInSessionStorage(this.orderProgress);
  }

  // Sets the checkbox values to null.

  private changeCheckBoxValuesToNull() {
    this._store.dispatch(new StoreIndividualOrCorporate(Constants.NULL_INDIVIDUAL_OR_CORPORATE));
    this._store.dispatch(new StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate(
      Constants.NULL_SELECTED_BETWEEN_INDIVIDUAL_AND_CORPORATE_TRUE_IF_INDIVIDUAL_FALSE_IF_CORPORATE));
  }

  // Basically it helps to coordinate the checkbox of the private and corporate customer.
  // It has two parameters, the first is the indOrCorp which can have two values: 'individual', 'corporate'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setIndOrCorpCheckboxValue(indOrCorp: string, selection: boolean) {
    if (indOrCorp === Constants.INDIVIDUAL) {
      this._store.dispatch(new StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate(selection));
      selection ?
        this._store.dispatch(new StoreIndividualOrCorporate(Constants.INDIVIDUAL)) :
        this._store.dispatch(new StoreIndividualOrCorporate(Constants.CORPORATE));
    } else if (indOrCorp === Constants.CORPORATE) {
      this._store.dispatch(new StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate(!selection));
      selection ?
        this._store.dispatch(new StoreIndividualOrCorporate(Constants.CORPORATE)) :
        this._store.dispatch(new StoreIndividualOrCorporate(Constants.INDIVIDUAL));
    }
  }

  // Basically it helps to coordinate the checkbox for the customers who
  // want and don't want inheritance calculation.
  // It has two parameters, the first is the wantOrNotCalculation which can have two values: 'wantCalculation', 'dontWantCalculation'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setInheritanceTaxCheckboxValue(wantOrNotCalculation: string, car: Car, selection: boolean) {
    if (wantOrNotCalculation === Constants.WANT_CALCULATION) {
      this._store.dispatch(new StoreWantInheritanceTaxCalculation(selection));
      if (selection) {
        this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.WANT_CALCULATION));
        this.countInheritanceTax(car);
      } else {
        this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.DONT_WANT_CALCULATION));
        this._store.dispatch(new GetInheritanceTaxSuccess(null));
        sessionStorage.removeItem('inheritanceTax');
      }
    } else if (wantOrNotCalculation === 'dontWantCalculation') {
      this._store.dispatch(new StoreWantInheritanceTaxCalculation(!selection));
      if (selection) {
        this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.DONT_WANT_CALCULATION))
        this._store.dispatch(new GetInheritanceTaxSuccess(null));
        sessionStorage.removeItem('inheritanceTax');
      } else {
        this._store.dispatch(new StoreAskForInheritanceTaxCalculation(Constants.WANT_CALCULATION));
        this.countInheritanceTax(car);
      }
    }
  }

  // Basically it helps to coordinate the checkbox for scenario when there is or there isn't count in car.
  // It has two parameters, the first is the isOrNotCountIn which can have two values: 'countIn', 'noCountIn'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setCountInCar(isOrNotCountIn: string, selection: boolean) {
    if (isOrNotCountIn === Constants.COUNT_IN) {
      this._store.dispatch(new StoreThereIsCountInCar(selection));
      selection ?
        this._store.dispatch(new StoreAddCountInCar(Constants.COUNT_IN)) :
        this._store.dispatch(new StoreAddCountInCar(Constants.NO_COUNT_IN));
    } else if (isOrNotCountIn === Constants.NO_COUNT_IN) {
      this._store.dispatch(new StoreThereIsCountInCar(!selection));
      selection ?
        this._store.dispatch(new StoreAddCountInCar(Constants.NO_COUNT_IN)) :
        this._store.dispatch(new StoreAddCountInCar(Constants.COUNT_IN));
    }
  }

  //TODO: reorganize the values of the count into setting component

  // Counts the inheritance tax for the customer
  // It has only one parameter which is the car itself.
  // Calls the http.service.ts's getUtility, getChargeForInheritanceTax methods to retrieve relevant data form the db.

  private countInheritanceTax (car: Car) {
    const infoForInheritanceCalculation = this.utilService.gatherInfoForInheritanceCalculation(car);
    this._store.dispatch(new GetCapacity(new InheritanceTaxInfoForChainedApiCall(
      null,
      null,
      null,
      null,
      car.kwh,
      new InheritanceChargeRequest(
        infoForInheritanceCalculation.stringKw,
        infoForInheritanceCalculation.stringAge),
      infoForInheritanceCalculation.stringCapacity,
      Constants.CAR_REGISTRY,
      Constants.EXTRA_CHARGE_AT_SELLING)));
  }

  // This is the first method gets called when somebody wants to buy a car.
  // It sets all data to null, making it like a clean sheet.
  // The clicked car will be the carOfTransaction and the http.service.ts's getOrder method gets called
  // If there is order for the picked car then the previously filled data gets loaded
  // otherwise a new order can be initiated

  public setAlreadyOrNewCustomerSelectorAndCarOfTransaction(car: Car, carIndex: number) {
    this.setDataToNull(carIndex);
    if (carIndex !== this.clickedCarIndex) {
      this._store.dispatch(new StorePickedCar(car));
      this._store.dispatch(new GetOrder(car.id));
      this._store.dispatch(new StoreClickedCarIndex(carIndex));
    } else {
      this._store.dispatch(new StoreClickedCarIndex(null));
      this._store.dispatch(new OrderError(Constants.NULL_ERROR));
    }
  }

  // Called in setAlreadyOrNewCustomerSelectorAndCarOfTransaction method
  // It calls the setFilterComponentVariablesAccordingToOrder method to set all the order related data
  // and if countInCarSupplement is present then sets it
  // and creates down payment form with the given data

  private setAllOrderDataAfterHttpCall(order: Order, car: Car) {
    this.setFilterComponentVariablesAccordingToOrder(order);
    if (this.countInCarSupplement) {
      this.setCountInCarSupplementForm(this.countInCarSupplement);
    }
    this.createDownPaymentFormWithData(this.downPayment, this.extra);
    this.carOfTransaction = car;
  }

  // Deletes car from the database, it uses the http.service.ts

  private deleteCar(carId: any) {
    this.httpService.deleteCar(carId).subscribe(data => {
      this.selectedCars.forEach(function (item, index, object) {
        if (item.id === carId) {
          object.splice(index, 1);
        }
      });
      sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
    }, error => {
      console.log(error);
      this.utilService.openSnackBar('Az adatbáziskapcsolat váratlanul megszakadt!', 'Hiba :(');
    })
  }

  // Selects type of buying and updates the carOfTransaction in the database.

  public selectTypeOfBuying(type: string) {
    const carUpdateRequest = new CarUpdateModel(
      Constants.NULL_NAME_OF_BUYER,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      type);
    this._store.dispatch(new UpdateCarTypeOfBuying(carUpdateRequest));
    this._store.dispatch(new StoreTypeOfBuying(type));

    if (this.selectedTypeOfBuying === 'HITEL') {
      this.openCreditModal(this.carOfTransaction);
    } else {
      this._store.dispatch(new StoreCredit(null));
      this._store.dispatch(new StoreCreditNeedsToBeRecalculated(false));
      sessionStorage.removeItem('credit');
    }
    this.setOrderProgressInSessionStorage(10);

  }

  // Sets all the variables to null then empties the selectedCars list and the orderProgress will be zero.
  // Initiate a fresh start.

  private clearSelectedCars() {
    this.setDataToNull(Constants.NO_CAR_INDEX);
    this.selectedCars = [];
    this.setOrderProgressInSessionStorage(0);
  }

  // This is a technical method.
  // It handles the orderProgress on the filter component page
  // The orderProgress starts with 0 and the highest value can be 10 at the moment.

  private setOrderProgressInSessionStorage(stage: number) {
    if (this.newOrder == null || stage === 10) {
      this._store.dispatch(new UpdateOrderProgress(stage));
    }
  }

  // Gets a string object through the users or company component as a result of an eventEmitter
  // if the orderProgress is less than 2 then the value 2 will be saved and set for the orderProgress variable
  // otherwise not (it can happen when an already saved order is edited and an event is triggered
  // but we don't want to change the orderProgress back to 2 from 10.

  public orderOnProgressWithUser(event: string) {
    if (event === 'saved' && this.orderProgress < 2) {
      this.setOrderProgressInSessionStorage(2);
    }
  }

  // Gets a users object through the users component as a result of an eventEmitter
  // and sets it in the sessionStorage
  // later on it will be saved along with the order.

  public addNewUserToOrder(user: Users) {
    this._store.dispatch(new StoreNewUser(user));
    const carUpdateRequest = new CarUpdateModel(
      user.fullName,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new StoreNameOfBuyer(carUpdateRequest));
  }

  // Gets a company object through the company component as a result of an eventEmitter
  // and sets it in the sessionStorage
  // later on it will be saved along with the order.

  public addNewCompanyToOrder(company: Company) {
    this._store.dispatch(new StoreNewCompany(company));
    const carUpdateRequest = new CarUpdateModel(
      company.name,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new StoreNameOfBuyer(carUpdateRequest));
  }

  // Gets a string object through the car component as a result of an eventEmitter
  // if the orderProgress is less than 4 then the value 4 will be saved and set for the orderProgress variable
  // otherwise not (it can happen when an already saved order is edited and an event is triggered
  // but we don't want to change the orderProgress back to 4 from 10.

  public orderOnProgressWithCar(event: string) {
    if (event === 'saved' && this.orderProgress < 4) {
      this.setOrderProgressInSessionStorage(4);
    }
  }

  // After field length validation the countInCarSupplement is saved into the sessionStorage
  // later on it will be part of the saved order

  public saveCountInCarSupplement(form: FormGroup) {
    if (this.validateFormFieldLength(form.value)) {
      this.countInCarSupplement = new CountInCarSupplement(
        form.value.countInPrice,
        form.value.previousLoan,
        form.value.previousBank,
        form.value.loanType);
      this._store.dispatch(new StoreCountInCarSupplement(this.countInCarSupplement));
      this.setOrderProgressInSessionStorage(5);
    }
  }

  // Down payment and extra payment are saved into the sessionStorage
  // later on it will be part of the saved order

  public saveDownPaymentAmount(form: FormGroup) {
    this._store.dispatch(new StoreDownPayment(form.value.downPayment));
    this._store.dispatch(new StoreExtraPayment(form.value.extra));
    if (form.value.downPayment == null && form.value.extra == null) {
      this.setOrderProgressInSessionStorage(6);
    }
  }

  // Gets a car object through the car component as a result of an eventEmitter
  // the car object is given as a value for the countInCar variable and saved into sessionStorage
  // and later on it will be saved along with the order.

  public getCountInCarData(car: Car) {
    const countInCarToStore = car as ICar;
    this._store.dispatch(new StoreCountInCar(countInCarToStore));
  }

  // Save the chosen salesman and update the car of transaction with it.

  public saveSalesman(salesman: string) {
    const carUpdateRequest = new CarUpdateModel(
      Constants.NULL_NAME_OF_BUYER,
      salesman,
      this.clickedCarIndex,
      Constants.NULL_CAR_HAND_OVER_DATE,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new UpdateCarSalesman(carUpdateRequest));
    this._store.dispatch(new StoreSalesman(salesman));
  }

  // Called many times throughout the filter component
  // It calls the http.service.ts with the updated car in order to save its new state
  // If the updated car will be bought then the returned data will be set for the countInCar variable
  // Else if the car will be for sale then the retrieved data will be set for the carOfTransaction variable
  // At both cases the new state of car is saved into sessionStorage as well.

  private updateCarOfTransaction(car: Car) {
    this.httpService.updateCar(car).subscribe(data => {
      if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
        this.carOfTransaction = data;
      } else {
        this.countInCar = data;
        sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
      }
    }, error => {
      console.log(error);
    });
  }

  // This is a simple one field form where the value of the field contains the date
  // which is agreed by the buyer and the seller to hand over the car.
  // The date gets updated by the relevant car in the database.

  public submitHandOver(form: any) {
    let carHandOverDate = new Date(form.value.handover);
    carHandOverDate.setHours(0);
    carHandOverDate.setMinutes(0);
    const carUpdateRequest = new CarUpdateModel(
      Constants.NULL_NAME_OF_BUYER,
      Constants.NULL_SALESMAN,
      this.clickedCarIndex,
      carHandOverDate,
      Constants.NULL_CAR_TYPE_OF_BUYING);
    this._store.dispatch(new UpdateCarHandOverDate(carUpdateRequest));
    this.setOrderProgressInSessionStorage(8);
  }

  // If any changes happens on the down payment form then ngModelChange triggers this method
  // and the new value gets updated in sessionStorage, and later on it will be part of the order.

  public saveChangedDownPayment(form: FormGroup) {
    this._store.dispatch(new StoreDownPayment(form.value.downPayment));
  }

  // If any changes happens on the extra form then ngModelChange triggers this method
  // and the new value gets updated in sessionStorage, and later on it will be part of the order.

  public saveChangedExtra(form: FormGroup) {
    this._store.dispatch(new StoreExtraPayment(form.value.extra));
  }

  // After the description with amount was filled and submitted, this method gets triggered.
  // This descriptions are only visible on the order page and not on the selling page.
  // It can be split into two groups. The first is when the item of the description is payed by the customer,
  // the second when it will be a gift.
  // Two variables are saved into the sessionStorage: listOfDescriptionWithAmount, giftIndexList.

  public saveDescriptions(descriptionForm: FormGroup) {
    this.listOfDescriptionsWithAmount = [];
    descriptionForm.value.description.forEach(descriptionWithAmount => {
      const descriptionAmount = descriptionWithAmount.charged === 'AJÁNDÉK' ? 0 : descriptionWithAmount.amount;
      if (descriptionWithAmount.descriptionText != null && descriptionWithAmount.charged != null) {
        const description = new DescriptionWithAmount(descriptionWithAmount.id, descriptionWithAmount.descriptionText, descriptionAmount, descriptionWithAmount.charged);
        this.listOfDescriptionsWithAmount.push(description);
      }
    });
    this.listOfDescriptionsWithAmount.forEach((item, index) => {
      const descriptionWithAmountRequest = new UpdateDescriptionWithAmountRequest(index, item);
      this._store.dispatch(new UpdateDescriptionWithAmount(descriptionWithAmountRequest));
    });
    this.setOrderProgressInSessionStorage(9);
  }

  // When it's been decided whether an item will be charged the customer or A2, this method gets called.
  // If the customer gets the item as a gift, then this item's index gets saved in a list called giftIndexList

  public addToGiftIndexList(index: number): boolean {
    this._store.dispatch(new StoreGiftIndexList(
      new UpdateGiftIndexListRequest(
        index,
        Constants.IT_IS_ADDING,
        Constants.IT_IS_NOT_DESCRIPTION_DELETE)));
    return true;
  }

  // When it's been decided whether an item will be charged the customer or A2, this method gets called.
  // If the customer has to pay for the item and the list contained the index of the item
  // then this item index gets removed from the giftIndexList

  public removeFromGiftIndexList(index: number): boolean {
    this._store.dispatch(new StoreGiftIndexList(
      new UpdateGiftIndexListRequest(
        index,
        Constants.IT_IS_NOT_ADDING,
        Constants.IT_IS_NOT_DESCRIPTION_DELETE)));
    return true;
  }

  //TODO: this method is a beast, needs to be refactored

  // Navigates to the clicked page.
  // It checks the downPayment form, the descriptions and the countInCarSupplement.
  // Then sets the user or company according to the value of alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready variable.
  // If the newOrder variable is null then a new Order objects is created and saved into the database
  // otherwise the previous one gets updated with the new values and updated in the database as well.
  // After the backend call the prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage method
  // gets called with the returned value.

  public navigateToOrderOrSellingOrWarrantOrInsurancePage(car: Car, orderedCarId: number, targetRoute: string,  witness1: Witness, witness2: Witness, warrantType: string, a2Representation: string, descriptionForm: FormGroup, countInCarSupplementForm: FormGroup, pickedTypeOfBuyingForCountInCar: string) {
    if (this.downPayment != null) {
      car.downPayment = this.downPayment;
      this.updateCarOfTransaction(car);
    }
    this.saveDescriptions(descriptionForm);
    this.saveCountInCarSupplement(countInCarSupplementForm);
    let userForOrder;
    let companyForOrder;
    if (this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready && this.newUser !=null) {
      userForOrder = this.newUser;
    } else if (this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready && this.newCompany !=null) {
      companyForOrder = this.newCompany;
    } else if (!this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready && this.pickedUser !=null) {
      userForOrder = this.pickedUser;
    } else if (!this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready && this.pickedCompany !=null) {
      companyForOrder = this.pickedCompany;
    }
    const countInCarId = this.countInCar != null ? this.countInCar.id : null;
    if (this.newOrder == null) {
      this.newOrder = new Order(null,
        this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready,
        this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate,
        this.wantInheritanceTaxCalculation,
        this.inheritanceTax,
        this.thereIsCountInCar,
        this.downPayment,
        this.extra,
        this.selectedTypeOfBuying,
        userForOrder,
        companyForOrder,
        this.countInCarSupplement,
        this.creditData,
        countInCarId,
        orderedCarId,
        this.descriptionList,
        this.listOfDescriptionsWithAmount);
    } else {
      this.newOrder.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
      this.newOrder.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate = this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate;
      this.newOrder.wantInheritanceTaxCalculation = this.wantInheritanceTaxCalculation;
      this.newOrder.inheritanceTax = this.inheritanceTax;
      this.newOrder.thereIsCountInCar = this.thereIsCountInCar;
      this.newOrder.downPayment = this.downPayment;
      this.newOrder.extra = this.extra;
      this.newOrder.selectedTypeOfBuying = this.selectedTypeOfBuying;
      this.newOrder.users = userForOrder;
      this.newOrder.company = companyForOrder;
      this.newOrder.countInCarSupplement = this.countInCarSupplement;
      this.newOrder.credit = this.creditData;
      this.newOrder.countInCarId = countInCarId;
      this.newOrder.carId = orderedCarId;
      this.newOrder.description = this.descriptionList;
      this.newOrder.descriptionsWithAmount = this.listOfDescriptionsWithAmount;
    }
    this._store.dispatch(new SaveOrder(this.newOrder));
    this.prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage(this.newOrder, car, witness1, witness2, targetRoute, warrantType, a2Representation, pickedTypeOfBuyingForCountInCar);
  }

  // Prepares the navigation to the clicked page. All the data traverse through the router.navigate method

  private prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage(order: Order, car: Car, witness1: Witness, witness2: Witness, orderOrSellingOrWarrant: string, warrantType: string, a2Representation: string, pickedTypeOfBuyingForCountInCar: string) {
    if ('/orderPage' !== orderOrSellingOrWarrant && this.creditNeedsToBeRecalculated || !this.creditNeedsToBeRecalculated) {
      sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      const orderedCar = this.selectedCars.find(carItem => carItem.id === this.newOrder.carId);
      sessionStorage.setItem('orderedCar', JSON.stringify(orderedCar));
      this._store.dispatch(new StorePickedCar(orderedCar));
      this.router.navigate([orderOrSellingOrWarrant], {state: {data: {
            clickedCarIndex: this.clickedCarIndex,
            userSearchResult: this.userSearchResult.data,
            companySearchResult: this.companySearchResult.data,
            indexOfPickedUser: this.indexOfPickedUser,
            pickedUser: this.pickedUser,
            indexOfPickedCompany: this.indexOfPickedCompany,
            pickedCompany: this.pickedCompany,
            switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer,
            witness1: witness1,
            witness2: witness2,
            warrantType: warrantType,
            a2Representation: a2Representation,
            typeOfBuying: pickedTypeOfBuyingForCountInCar,
          }}});
    }
  }

  // It opens the carTimeInfoDialog, and it is decided at this point that the selling page will be for sell or buy.

  public gatherSellingPageInfo(car: Car, orderedCarId: number, sellOrBuy: string, descriptionForm: FormGroup, countInCarSupplementForm: FormGroup) {
    this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer = sellOrBuy === 'sell';
    this.openCarTimeInfoDialog(car, orderedCarId, sellOrBuy, descriptionForm, countInCarSupplementForm);
  }

  // Navigates to blank order page for the clicked car.

  public navigateToBlankOrderPage(car: Car) {
    this._store.dispatch(new StoreIsBlankPage(true));
    this._store.dispatch(new StorePickedCar(car));
    this.router.navigate(['/orderPage']);
  }

  // Navigates to insurance page

  public navigateToInsurancePage(car: Car, descriptionForm: FormGroup, countInCarSupplementForm: FormGroup) {
    this.navigateToOrderOrSellingOrWarrantOrInsurancePage(car, car.id, '/insurance', null, null, null, null, descriptionForm, countInCarSupplementForm, null);
  }

  // Opens the witness picker dialog

  public openWitnessPickerForWarrantPage(descriptionForm: FormGroup, countInCarSupplementForm: FormGroup) {
    this.openWitnessPickerModal(descriptionForm, countInCarSupplementForm);
  }

  // This is a technical method, it collects data from form array.
  // It is used to collect descriptions.

  get formData() {return <FormArray>this.descriptionForm.get('description');}

  // Validates the length of the form fields

  private validateFormFieldLength(formValue: any): boolean {
    const formValues = Object.values(formValue);
    for (const value of formValues) {
      if (typeof value === "string" && value.length > 30) {
        this.tooLongFieldValue = value;
        this.isThereLongFieldValue = true;
        return false;
      }
    }
    return true;
  }

  public navigateToOrderPage(car: Car, carIndex: number) {
    this.setDataToNull(carIndex);
    this.httpService.getOrder(car.id).subscribe(data => {
      this.router.navigate(['/orderPage'], {state: {data: {
            order: data,
            orderedCar: car,
            pickedUser: data.users,
            pickedCompany: data.company,
            trophyClick: true
          }}});
    }, error => {
      if (error.error.errorCode === '404') {
        this.utilService.openSnackBar('Ehhez az autóhoz még nincs rendelés!', ':(');
      }
    });
  }

  public saveChangedDescription(form: FormGroup, index: number) {
    const descriptionAmount = form.value.description[index].charged === 'AJÁNDÉK' ? 0 : form.value.description[index].amount;
    const updatedDescriptionWithAmount = new DescriptionWithAmount(
      form.value.description[index].id,
      form.value.description[index].descriptionText,
      descriptionAmount,
      form.value.description[index].charged
    )
    const updateRequest = new UpdateDescriptionWithAmountRequest(index, updatedDescriptionWithAmount);
    this._store.dispatch(new UpdateDescriptionWithAmount(updateRequest));
  }

  public goToPage(pageNumber: number) {
    this.recentPage = pageNumber;
    const OFFSET = (pageNumber - 1) * Constants.PAGE_LIMIT;
    const orderBy = this.selectedOrganizer != null ? this.selectedOrganizer.value : null;
    const orderDirection = this.selectedOrganizer != null ? this.selectedOrganizer.direction : null;
    if (null == this.searchParameters.searchedText && null == this.searchParameters.searchBy) {
      const searchParameters = new SearchParameters(
        null,
        null,
        this.searchParameters.isSold,
        pageNumber,
        Constants.SELECTED_CARS_QUANTITY_NOT_KNOWN_YET
      );
      this._store.dispatch(new UpdateSearchParameters(searchParameters));
      const carFilterRequest = new CarFilterRequest(
        Constants.NULL_CAR_SEARCH_TEXT,
        Constants.NULL_SELECTED_FILTER_TYPE,
        this.searchParameters.isSold,
        Constants.PAGE_LIMIT,
        OFFSET,
        orderBy,
        orderDirection
      );
      this._store.dispatch(new GetCars(carFilterRequest));
    } else {
      const searchParameters = new SearchParameters(
        this.searchParameters.searchedText,
        this.searchParameters.searchBy,
        this.searchParameters.isSold,
        pageNumber,
        Constants.SELECTED_CARS_QUANTITY_NOT_KNOWN_YET
      );
      this._store.dispatch(new UpdateSearchParameters(searchParameters));
      const carFilterRequest = new CarFilterRequest(
        this.searchParameters.searchedText,
        this.searchParameters.searchBy,
        this.searchParameters.isSold,
        Constants.PAGE_LIMIT,
        OFFSET,
        orderBy,
        orderDirection
      );
      this._store.dispatch(new GetFilteredCars(carFilterRequest));
    }
  }
}

