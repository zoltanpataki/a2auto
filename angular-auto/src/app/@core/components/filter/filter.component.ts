import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {SelectedFilter} from "../../models/selectedFilter";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {Car} from "../../models/car";
import {WarningDialogComponent} from "../../dialog/warning-dialog/warning-dialog.component";
import {CreditDialogComponent} from "../../dialog/credit-dialog/credit-dialog.component";
import {CountInCarSupplement} from "../../models/countInCarSupplement";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Users} from "../../models/users";
import {Credit} from "../../models/credit";
import {Company} from "../../models/company";
import {NavigationEnd, Router} from "@angular/router";
import {Order} from "../../models/order";
import {Description} from "../../models/description";
import {CarTimeInfoComponent} from "../../dialog/car-time-info/car-time-info.component";
import {Witness} from "../../models/witness";
import {WitnessPickerDialogComponent} from "../../dialog/witness-picker-dialog/witness-picker-dialog.component";
import {DescriptionWithAmount} from "../../models/descriptionWithAmount";
import {Direction, Organizer} from "../../models/organizer";

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
  public filters = [{viewValue: 'Modell', value: 'name'}, {viewValue: 'Rendszám', value: 'plateNumber'}, {viewValue: 'Márka', value: 'type'}, {viewValue: 'Összes', value: 'all'}, {viewValue: 'Eladott', value: 'sold'}];
  public organizers = [{viewValue: 'Márka', value: 'type', direction: Direction.up}, {viewValue: 'Márka', value: 'type', direction: Direction.down}, {viewValue: 'Vásárló', value: 'buyer', direction: Direction.up}, {viewValue: 'Vásárló', value: 'buyer', direction: Direction.down}, {viewValue: 'Modell', value: 'name', direction: Direction.up}, {viewValue: 'Modell', value: 'name', direction: Direction.down}, {viewValue: 'Rendszám', value: 'plateNumber', direction: Direction.up}, {viewValue: 'Rendszám', value: 'plateNumber', direction: Direction.down}];
  public secondaryFilters = [{viewValue: 'Modell', value: 'name'}, {viewValue: 'Rendszám', value: 'plateNumber'}, {viewValue: 'Márka', value: 'type'}];
  public userFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Város', value: 'city'}];
  public selectedFilter: SelectedFilter;
  public selectedOrganizer: Organizer;
  public secondarySelectedFilter: SelectedFilter;
  public selectedUserFilter: SelectedFilter;
  public companyFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Cégjegyzékszám', value: 'companyRegistrationNumber'}];
  public selectedCompanyFilter: SelectedFilter;
  public selectedCars = [];
  public selectedCarHeader = ['Márka', 'Modell', 'Rendszám', 'Vevő', 'Vásárlás dátuma'];
  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  public noMatch = false;
  public selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: boolean;
  public alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean;
  public checkedIndividual: boolean;
  public checkedCorporate: boolean;
  public previousOrNew: string;
  public individualOrCorporate: string;
  public selectedTypeOfBuying;
  public carOfTransaction: Car;
  public userSearchResult = new MatTableDataSource<Users>();
  public companySearchResult = new MatTableDataSource<Company>();
  public inheritanceTax: number;
  public orderProgress: number = 0;
  public askForInheritanceTaxCalculation: string;
  public wantInheritanceTaxCalculation: boolean;
  public addCountInCar: string;
  public thereIsCountInCar: boolean;
  public countInCarSupplement: CountInCarSupplement;
  public clickedCarIndex: number;
  public extra: number;
  public userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  public companyDisplayedColumns: string[] = ['name', 'registrationNumber', 'representation', 'symbol'];
  public pickedUser: Users;
  public pickedCompany: Company;
  public indexOfPickedUser: number;
  public indexOfPickedCompany: number;
  public creditData: Credit;
  public countInCar: Car;
  public salesman: string;
  public newOrder: Order;
  public newUser: Users;
  public newCompany: Company;
  public descriptionList: Description[] = [];
  public switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: boolean = true;
  // Downpayment form variables
  public downPaymentForm: FormGroup;
  public downPayment: number;
  // Description with amount form variables
  public descriptionForm: FormGroup;
  public description: FormArray;
  public descriptions: FormArray;
  public listOfDescriptionsWithAmount: DescriptionWithAmount[] = [];
  public chargedBehalf = ['AJÁNDÉK', 'VEVŐ FIZETI'];
  public giftIndexList = [];
  @ViewChild('focuser', { read: ElementRef })
  public focuser: ElementRef;
  public nameOfBuyer;
  public tooLongFieldValue: string = '';
  public isThereLongFieldValue: boolean = false;
  public creditNeedsToBeRecalculated: boolean = false;

  constructor(private httpService: HttpService,
              public utilService: UtilService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef,
              public router: Router,) {
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
    if (this.utilService.witnesses == null) {
      this.httpService.getAllWitnesses().subscribe(data => {
        this.utilService.witnesses = data;
        this.utilService.witnesses.push(this.utilService.createBlankWitnessToUtilServiceWitnessList());
      });
    }
    if (this.utilService.salesmen == null) {
      this.httpService.getAllSalesmen().subscribe(data => {
        this.utilService.salesmen = data;
      });
    }
    if (sessionStorage.getItem('selectedCars')) {
      this.selectedCars = JSON.parse(sessionStorage.getItem('selectedCars'));
    }
    if (sessionStorage.getItem('clickedCarIndex')) {
      this.clickedCarIndex = Number(sessionStorage.getItem('clickedCarIndex'));
      this.carOfTransaction = this.selectedCars[this.clickedCarIndex];
      if (this.carOfTransaction && this.carOfTransaction.carHandover && new Date(this.carOfTransaction.carHandover).getFullYear() === new Date(0).getFullYear()) {
        this.carOfTransaction.carHandover = null;
      }
    }
    if (sessionStorage.getItem('order')) {
      const order = JSON.parse(sessionStorage.getItem('order'));
      if (order.carId && order.carId === this.carOfTransaction.id) {
        this.newOrder = JSON.parse(sessionStorage.getItem('order'));
        this.setFilterComponentVariablesAccordingToOrder(this.newOrder);
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
    } else {
      this.setDescriptionForm();
    }
    if (this.downPayment == null) {
      this.createEmptyDownPaymentForm();
    } else {
      this.createDownPaymentFormWithData(this.downPayment, this.extra);
    }
    this.changeDetectorRefs.detectChanges();
  }

  // Retrieve all the data after refresh

  private getDataFromSessionStorageAfterRefresh() {
    if (sessionStorage.getItem('orderProgress')) {
      this.orderProgress = Number(sessionStorage.getItem('orderProgress'));
    }
    if (sessionStorage.getItem('userSearchData')) {
      this.userSearchResult.data = JSON.parse(sessionStorage.getItem('userSearchData'));
    }
    if (sessionStorage.getItem('companySearchData')) {
      this.companySearchResult.data = JSON.parse(sessionStorage.getItem('companySearchData'));
    }
    if (sessionStorage.getItem('indexOfPickedUser')) {
      this.indexOfPickedUser = Number(sessionStorage.getItem('indexOfPickedUser'));
    }
    if (sessionStorage.getItem('indexOfPickedCompany')) {
      this.indexOfPickedCompany = Number(sessionStorage.getItem('indexOfPickedCompany'));
    }
    if (sessionStorage.getItem('pickedUser')) {
      this.pickedUser = JSON.parse(sessionStorage.getItem('pickedUser'));
    }
    if (sessionStorage.getItem('newUserDuringSell')) {
      this.newUser = JSON.parse(sessionStorage.getItem('newUserDuringSell'));
    }
    if (sessionStorage.getItem('pickedCompany')) {
      this.pickedCompany = JSON.parse(sessionStorage.getItem('pickedCompany'));
    }
    if (sessionStorage.getItem('newCompanyDuringSell')) {
      this.newCompany = JSON.parse(sessionStorage.getItem('newCompanyDuringSell'));
    }
    if (sessionStorage.getItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready')) {
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = JSON.parse(sessionStorage.getItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready'));
      this.previousOrNew = this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready ? 'new' : 'previous';
    }
    if (sessionStorage.getItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate')) {
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = JSON.parse(sessionStorage.getItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate'));
      this.individualOrCorporate = this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate ? 'individual' : 'corporate';
    }
    if (sessionStorage.getItem('wantInheritanceTaxCalculation')) {
      this.wantInheritanceTaxCalculation = JSON.parse(sessionStorage.getItem('wantInheritanceTaxCalculation'));
      this.askForInheritanceTaxCalculation = this.wantInheritanceTaxCalculation ? 'wantCalculation' : 'dontWantCalculation';
    }
    if (sessionStorage.getItem('thereIsCountInCar')) {
      this.thereIsCountInCar = JSON.parse(sessionStorage.getItem('thereIsCountInCar'));
      this.addCountInCar = this.thereIsCountInCar ? 'countIn' : 'noCountIn';
    }
    if (sessionStorage.getItem('countInCar')) {
      this.countInCar = JSON.parse(sessionStorage.getItem('countInCar'));
    }
    if (sessionStorage.getItem('countInCarSupplement')) {
      this.countInCarSupplement = JSON.parse(sessionStorage.getItem('countInCarSupplement'));
    }
    if (sessionStorage.getItem('downPayment')) {
      this.downPayment = Number(sessionStorage.getItem('downPayment'));
      console.log(this.downPayment);
    }
    if (sessionStorage.getItem('descriptionList')) {
      this.descriptionList = JSON.parse(sessionStorage.getItem('descriptionList'));
    }
    if (sessionStorage.getItem('extra')) {
      this.extra = Number(sessionStorage.getItem('extra'));
    }
    if (sessionStorage.getItem('descriptionsWithAmount')) {
      this.listOfDescriptionsWithAmount = JSON.parse(sessionStorage.getItem('descriptionsWithAmount'));
    }
    if (sessionStorage.getItem('giftIndexList')) {
      this.giftIndexList = JSON.parse(sessionStorage.getItem('giftIndexList'));
    }
    if (sessionStorage.getItem('selectedTypeOfBuying')) {
      this.selectedTypeOfBuying = sessionStorage.getItem('selectedTypeOfBuying');
    }
    if (sessionStorage.getItem('salesman')) {
      this.salesman = sessionStorage.getItem('salesman');
    }
    if (sessionStorage.getItem('inheritanceTax')) {
      this.inheritanceTax = Number(sessionStorage.getItem('inheritanceTax'));
    }
    if (sessionStorage.getItem('credit')) {
      this.creditData = JSON.parse(sessionStorage.getItem('credit'));
    }
    if (sessionStorage.getItem('nameOfBuyer')) {
      this.nameOfBuyer = sessionStorage.getItem('nameOfBuyer');
    }
    if (sessionStorage.getItem('creditNeedsToBeRecalculated')) {
      this.creditNeedsToBeRecalculated = JSON.parse(sessionStorage.getItem('creditNeedsToBeRecalculated'));
    }
    if (sessionStorage.getItem('selectedOrganizer')) {
      this.selectedOrganizer = JSON.parse(sessionStorage.getItem('selectedOrganizer'));
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
    sessionStorage.removeItem('nameOfBuyer');
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

  private setDataToNull() {
    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = null;
    this.previousOrNew = null;
    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = null;
    this.individualOrCorporate = null;
    this.userSearchResult.data = null;
    this.companySearchResult.data = null;
    this.pickedUser = null;
    this.newUser = null;
    this.indexOfPickedUser = null;
    this.pickedCompany = null;
    this.newCompany = null;
    this.indexOfPickedCompany = null;
    this.selectedUserFilter = null;
    this.selectedCompanyFilter = null;
    this.orderProgress = 0;
    this.wantInheritanceTaxCalculation = null;
    this.askForInheritanceTaxCalculation = null;
    this.thereIsCountInCar = null;
    this.addCountInCar = null;
    this.downPayment = null;
    this.createEmptyDownPaymentForm();
    this.descriptionList = [];
    this.description = null;
    this.descriptions = null;
    this.giftIndexList = [];
    this.listOfDescriptionsWithAmount = [];
    this.createFormGroupForDescriptionWithAmount();
    this.createEmptyCarSupplementForm();
    this.extra = null;
    this.salesman = null;
    this.selectedTypeOfBuying = null;
    this.newOrder = null;
    this.inheritanceTax = null;
    this.countInCar = null;
    this.countInCarSupplement = null;
    this.setOrderProgressInSessionStorage(0);
    this.removeItemsFromSessionStorage();
    this.creditData = null;
    this.nameOfBuyer = null;
    this.creditNeedsToBeRecalculated = false;
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
    this.descriptions = this.descriptionForm.get('description') as FormArray;
    if (this.descriptions.length === 1) {
      this.giftIndexList = [];
      this.listOfDescriptionsWithAmount = [];
      this.createFormGroupForDescriptionWithAmount();
    } else {
      this.descriptions.removeAt(index);
      if (this.giftIndexList.includes(index)) {
        this.giftIndexList.splice(this.giftIndexList.indexOf(index), 1);
      }
      this.giftIndexList.forEach(function (item, indexOfItem, array) {
        if (item > index) {
          item -= 1;
          array[indexOfItem] = item;
        }
      })
    }
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
    sessionStorage.removeItem('clickerCarIndex');
    if ('sold' !== this.selectedFilter.value && this.secondarySelectedFilter != null) {
      this.secondarySelectedFilter = null;
    }
  }

  public checkSelectedOrganizer() {
    const selectedDirection = this.selectedOrganizer.direction;
    const organizerType = this.selectedOrganizer.value;
    this.sortSelectedCars(this.selectedCars, organizerType, selectedDirection);
    sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
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
  // the third is the soldOrNot, which helps distinguish between sold and active cars.
  // The getAllCars method gets called in the same service

  public filterCars(form: any) {
    this.selectedOrganizer = null;
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
        let formValue = null;
        this.utilService.validPlateNumber = true;
        this.utilService.emptySearchField = false;
        switch (Object.keys(form.value)[0]) {
          case 'name': {
            formValue = form.value.name.toUpperCase();
            break;
          }
          case 'type': {
            formValue = form.value.type.toUpperCase();
            break;
          }
          case 'plateNumber': {
            formValue = form.value.plateNumber.toUpperCase();
            break;
          }
        }

        if (this.selectedFilter.value !== 'all') {
          const soldOrNot = this.selectedFilter.value === 'sold';
          const selectedFilterValue = soldOrNot ? this.secondarySelectedFilter.value : this.selectedFilter.value;
          this.httpService.getSingleCar(formValue, selectedFilterValue, soldOrNot.toString()).subscribe(data => {
            if (!data) {
              this.noMatch = true;
            }
            if (Array.isArray(data)) {
              this.selectedCars = data;
              sessionStorage.setItem('selectedCars', JSON.stringify(data));
            } else {
              this.selectedCars = [];
              this.selectedCars.push(data);
              sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
            }
          }, error => {
            sessionStorage.clear();
            this.selectedCars = [];
            if (error.error.errorCode === '404') {
              this.utilService.openSnackBar('Ilyen paraméterű autó nem található!', 'Hiba :(');
            } else {
              this.utilService.openSnackBar('Az adatbáziskapcsolat váratlanul megszakadt!', 'Hiba :(');
            }
          });
        } else {
          this.httpService.getAllCars(false).subscribe(data => {
            this.selectedCars = data;
            sessionStorage.setItem('selectedCars', JSON.stringify(data));
          });
        }
      }
    }
  }

  // It uses the http.service.ts to retrieve all the car objects through http call.
  // The only parameter it gets is allOrSold with the value of 'all'.

  public getAllCars(isSold: boolean) {
    this.clickedCarIndex = null;
    this.selectedOrganizer = null;
    sessionStorage.removeItem('clickerCarIndex');
    this.clearSelectedCars();
    this.httpService.getAllCars(isSold).subscribe(data => {
      this.selectedCars = data;
      sessionStorage.setItem('selectedCars', JSON.stringify(data));
    });
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
      if (null != this.nameOfBuyer && null != this.carOfTransaction) {
        this.carOfTransaction.nameOfBuyer = this.nameOfBuyer;
      }
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
        this.creditData = result;
        this.creditNeedsToBeRecalculated = false;
      }
      if (this.creditData != null) {
        sessionStorage.setItem("credit", JSON.stringify(this.creditData));
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
          sessionStorage.setItem('descriptionList', JSON.stringify(this.descriptionList));
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
    this.descriptionList = newDescriptionList;
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
      this.httpService.getUser(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value).subscribe(data => {
        this.userSearchResult.data = data;
        this.changeDetectorRefs.detectChanges();
        sessionStorage.setItem('userSearchData', JSON.stringify(data));
      });
      this.setOrderProgressInSessionStorage(2);
    }
  }

  // Selects user from userSearchResult
  // It has only one parameter which is a number(index).
  // After that the chosen user will be set as pickedUser and put into the sessionStorage
  // and will be saved as the part of the order
  // Also the nameOfBuyer variable is set and saved into sessionStorage
  // the nameOfBuyer play its part as a column value in the filter component

  public pickUser(index: number) {
    this.indexOfPickedUser = index;
    const pickedUserFromDataTable = this.userSearchResult.data[index];
    this.pickedUser = new Users(
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
      pickedUserFromDataTable.nationality);
    sessionStorage.setItem('pickedUser', JSON.stringify(this.pickedUser));
    sessionStorage.setItem('indexOfPickedUser', this.indexOfPickedUser.toString());
    this.carOfTransaction.nameOfBuyer = this.pickedUser.fullName;
    this.nameOfBuyer = this.pickedUser.fullName;
    sessionStorage.setItem('nameOfBuyer', this.nameOfBuyer);
    this.updateCarOfTransaction(this.carOfTransaction);
  }

  // When a previous customer (corporate) wants to buy or sell a car
  // then the data about the customer gets retrieved from the database.
  // It has two parameters, the first is the value of the field, the second is the filter type.
  // The resulting data will also be part of the order.

  public filterCompany(form: any) {
    if (this.validateFormFieldLength(form.value)) {
      this.httpService.getCompany(this.setFormValuesToUpperCase(form), this.selectedCompanyFilter.value).subscribe(data => {
        this.companySearchResult.data = data;
        this.changeDetectorRefs.detectChanges();
        sessionStorage.setItem('companySearchData', JSON.stringify(data));
      });
      this.setOrderProgressInSessionStorage(2);
    }
  }

  // Selects company from companySearchResult
  // It has only one parameter which is a number(index).
  // After that the chosen company will be set as pickedCompany and put into the sessionStorage
  // and will be saved as the part of the order
  // Also the nameOfBuyer variable is set and saved into sessionStorage
  // the nameOfBuyer play its part as a column value in the filter component

  public pickCompany(index: number) {
    this.indexOfPickedCompany = index;
    const pickedCompanyFromDataTable = this.companySearchResult.data[index];
    this.pickedCompany = new Company(
      pickedCompanyFromDataTable.id,
      pickedCompanyFromDataTable.name,
      pickedCompanyFromDataTable.address,
      pickedCompanyFromDataTable.companyRegistrationNumber,
      pickedCompanyFromDataTable.representation,
      pickedCompanyFromDataTable.taxNumber,
      pickedCompanyFromDataTable.phoneNumber,
      pickedCompanyFromDataTable.email);
    sessionStorage.setItem('pickedCompany', JSON.stringify(this.pickedCompany));
    sessionStorage.setItem('indexOfPickedCompany', this.indexOfPickedCompany.toString());
    this.carOfTransaction.nameOfBuyer = this.pickedCompany.name;
    this.nameOfBuyer = this.pickedCompany.name;
    sessionStorage.setItem('nameOfBuyer', this.nameOfBuyer);
    this.updateCarOfTransaction(this.carOfTransaction);
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
    if (previousOrNew === 'previous') {
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = !selection;
      this.previousOrNew = selection ? 'previous' : 'new';
    } else if (previousOrNew === 'new') {
      this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = selection;
      this.previousOrNew = selection ? 'new' : 'previous';
    }
    this.orderProgress = this.orderProgress > 1 ? this.orderProgress : 1;
    this.setOrderProgressInSessionStorage(this.orderProgress);
    sessionStorage.setItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready', this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready.toString());
  }

  // Sets the checkbox values to null.

  private changeCheckBoxValuesToNull() {
    this.individualOrCorporate = null;
    this.checkedIndividual = null;
    this.checkedCorporate = null;
    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = null;
  }

  // Basically it helps to coordinate the checkbox of the private and corporate customer.
  // It has two parameters, the first is the indOrCorp which can have two values: 'individual', 'corporate'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setIndOrCorpCheckboxValue(indOrCorp: string, selection: boolean) {
    if (indOrCorp === 'individual') {
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = selection;
      if (selection) {
        this.checkedIndividual = true;
        this.checkedCorporate = false;
        this.individualOrCorporate = 'individual';
      } else {
        this.checkedIndividual = false;
        this.checkedCorporate = true;
        this.individualOrCorporate = 'corporate';
      }
    } else if (indOrCorp === 'corporate') {
      this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = !selection;
      if (selection) {
        this.checkedIndividual = false;
        this.checkedCorporate = true;
        this.individualOrCorporate = 'corporate';
      } else {
        this.checkedIndividual = true;
        this.checkedCorporate = false;
        this.individualOrCorporate = 'individual';
      }
    }
    sessionStorage.setItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate', this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate.toString());
  }

  // Basically it helps to coordinate the checkbox for the customers who
  // want and don't want inheritance calculation.
  // It has two parameters, the first is the wantOrNotCalculation which can have two values: 'wantCalculation', 'dontWantCalculation'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setInheritanceTaxCheckboxValue(wantOrNotCalculation: string, car: Car, selection: boolean) {
    if (wantOrNotCalculation === 'wantCalculation') {
      if (selection) {
        this.askForInheritanceTaxCalculation = 'wantCalculation';
        this.wantInheritanceTaxCalculation = true;
        this.countInheritanceTax(car);
      } else {
        this.inheritanceTax = null;
        this.askForInheritanceTaxCalculation = 'dontWantCalculation';
        this.wantInheritanceTaxCalculation = false;
        this.orderProgress = this.orderProgress > 3 ? this.orderProgress : 3;
        this.setOrderProgressInSessionStorage(this.orderProgress);
      }
    } else if (wantOrNotCalculation === 'dontWantCalculation') {
      if (selection) {
        this.inheritanceTax = null;
        this.askForInheritanceTaxCalculation = 'dontWantCalculation';
        this.wantInheritanceTaxCalculation = false;
        this.orderProgress = this.orderProgress > 3 ? this.orderProgress : 3;
        this.setOrderProgressInSessionStorage(this.orderProgress);
      } else {
        this.askForInheritanceTaxCalculation = 'wantCalculation';
        this.wantInheritanceTaxCalculation = true;
        this.countInheritanceTax(car);
      }
    }
    sessionStorage.setItem('wantInheritanceTaxCalculation', this.wantInheritanceTaxCalculation.toString());
  }

  // Basically it helps to coordinate the checkbox for scenario when there is or there isn't count in car.
  // It has two parameters, the first is the isOrNotCountIn which can have two values: 'countIn', 'noCountIn'.
  // The second parameter is a boolean which can say whether a checkbox's click event was true or false =>
  // (the box is filled or not).

  public setCountInCar(isOrNotCountIn: string, selection: boolean) {
    if (isOrNotCountIn === 'countIn') {
      if (selection) {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      } else {
        this.addCountInCar = 'noCountIn';
        this.thereIsCountInCar = false;
        this.countInCar = null;
        this.countInCarSupplement = null;
        this.setOrderProgressInSessionStorage(5);
      }
    } else if (isOrNotCountIn === 'noCountIn') {
      if (selection) {
        this.addCountInCar = 'noCountIn';
        this.thereIsCountInCar = false;
        this.countInCar = null;
        this.countInCarSupplement = null;
        this.setOrderProgressInSessionStorage(5);
      } else {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      }
    }
    sessionStorage.setItem('thereIsCountInCar', this.thereIsCountInCar.toString());
  }

  //TODO: reorganize the values of the count into setting component

  // Counts the inheritance tax for the customer
  // It has only one parameter which is the car itself.
  // Calls the http.service.ts's getUtility, getChargeForInheritanceTax methods to retrieve relevant data form the db.

  private countInheritanceTax (car: Car) {
    const carAge = (new Date()).getFullYear() - car.vintage;
    let stringKw = null;
    let stringAge = null;
    let stringCapacity = null;

    if (car.kwh < 41) {
      stringKw = 'S';
    } else if (car.kwh > 40 && car.kwh < 81) {
      stringKw = 'M';
    } else if (car.kwh > 80 && car.kwh < 121) {
      stringKw = 'L';
    } else if (car.kwh > 120) {
      stringKw = 'XL';
    }

    if (carAge < 4) {
      stringAge = 'young';
    } else if (carAge > 3 && carAge < 9) {
      stringAge = 'mediumAged';
    } else if (carAge > 8) {
      stringAge = 'old';
    }

    if (car.carOrTruck === 'SZEMÉLYGÉPJÁRMŰ' || car.carOrTruck == null) {
      if (car.capacity < 1401) {
        stringCapacity = 'smallCapacity';
      } else if (car.capacity > 1400 && car.capacity < 2001) {
        stringCapacity = 'mediumCapacity';
      } else if (car.capacity > 2000) {
        stringCapacity = 'largeCapacity';
      }
    } else {
      stringCapacity = 'largeCapacity';
    }

    this.httpService.getUtility(stringCapacity).subscribe(utility => {
      this.httpService.getChargeForInheritanceTax(stringKw, stringAge).subscribe(chargeForInheritanceTax => {
        this.httpService.getUtility('carRegistry').subscribe(carReg => {
          this.httpService.getUtility('extraChargeAtSelling').subscribe(charge => {
            const carRegistry = Number(carReg.value);
            const extraCharge = Number(charge.value);
            this.inheritanceTax = Number(utility.value) + (chargeForInheritanceTax * car.kwh) + carRegistry + extraCharge;
            sessionStorage.setItem('inheritanceTax', this.inheritanceTax.toString());
            this.orderProgress = this.orderProgress > 3 ? this.orderProgress : 3;
            this.setOrderProgressInSessionStorage(this.orderProgress);
          });
        });
      }, error1 => {
        this.utilService.openSnackBar('Sajnos az autó évjárata vagy lökettérfogata hiányzik!', 'Hiba :(');
      });
    }, error1 => {
      this.utilService.openSnackBar('Sajnos az autó hengerűrtartalma hiányzik!', 'Hiba :(');
    });
  }

  // This is the first method gets called when somebody wants to buy a car.
  // It sets all data to null, making it like a clean sheet.
  // The clicked car will be the carOfTransaction and the http.service.ts's getOrder method gets called
  // If there is order for the picked car then the previously filled data gets loaded
  // otherwise a new order can be initiated

  public setAlreadyOrNewCustomerSelectorAndCarOfTransaction(car: Car, index: number) {
    this.setDataToNull();
    if (index !== this.clickedCarIndex) {
      this.carOfTransaction = car;
      this.httpService.getOrder(car.id).subscribe(data => {
        this.newOrder = <Order> data;
        this.setAllOrderDataAfterHttpCall(this.newOrder, car);
        sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      }, error => {
        if (error.error.errorCode === '404') {
          this.utilService.openSnackBar('Ehhez az autóhoz még nincs rendelés!', ':(');
        }
      });
      this.clickedCarIndex = this.clickedCarIndex !== index ? index : null;
      if (this.clickedCarIndex != null) {
        sessionStorage.setItem('clickedCarIndex', this.clickedCarIndex.toString());
      }
    } else {
      this.clickedCarIndex = this.clickedCarIndex !== index ? index : null;
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

  public selectTypeOfBuying(type: any, car: Car) {
    this.selectedTypeOfBuying = type;
    this.carOfTransaction.typeOfBuying = type;
    this.httpService.updateCar(this.carOfTransaction).subscribe(data => {
      this.carOfTransaction = data;
      this.selectedCars[this.clickedCarIndex] = data;
      sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
    });
    if (this.selectedTypeOfBuying === 'HITEL') {
      this.openCreditModal(this.carOfTransaction);
    } else {
      this.creditData = null;
      this.creditNeedsToBeRecalculated = false;
      sessionStorage.removeItem('credit');
    }
    this.setOrderProgressInSessionStorage(10);
    sessionStorage.setItem('selectedTypeOfBuying', this.selectedTypeOfBuying);
  }

  // Sets all the variables to null then empties the selectedCars list and the orderProgress will be zero.
  // Initiate a fresh start.

  private clearSelectedCars() {
    this.setDataToNull();
    this.selectedCars = [];
    this.setOrderProgressInSessionStorage(0);
  }

  // This is a technical method.
  // It handles the orderProgress on the filter component page
  // The orderProgress starts with 0 and the highest value can be 10 at the moment.

  private setOrderProgressInSessionStorage(stage: number) {
    if (this.newOrder == null || stage === 10) {
      this.orderProgress = stage;
      sessionStorage.setItem('orderProgress', this.orderProgress.toString());
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

  public addNewUserToOrder(event: Users) {
    this.newUser = event;
    this.carOfTransaction.nameOfBuyer = this.newUser.fullName;
    this.nameOfBuyer = this.newUser.fullName;
    sessionStorage.setItem('nameOfBuyer', this.nameOfBuyer);
    this.updateCarOfTransaction(this.carOfTransaction);
    sessionStorage.setItem('newUserDuringSell', JSON.stringify(this.newUser));
  }

  // Gets a company object through the company component as a result of an eventEmitter
  // and sets it in the sessionStorage
  // later on it will be saved along with the order.

  public addNewCompanyToOrder(event: Company) {
    this.newCompany = event;
    this.carOfTransaction.nameOfBuyer = this.newCompany.name;
    this.nameOfBuyer = this.newCompany.name;
    sessionStorage.setItem('nameOfBuyer', this.nameOfBuyer);
    this.updateCarOfTransaction(this.carOfTransaction);
    sessionStorage.setItem('newCompanyDuringSell', JSON.stringify(this.newCompany));
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
      sessionStorage.setItem('countInCarSupplement', JSON.stringify(this.countInCarSupplement));
      this.setOrderProgressInSessionStorage(5);
    }
  }

  // Down payment and extra payment are saved into the sessionStorage
  // later on it will be part of the saved order

  public saveDownPaymentAmount(form: FormGroup, car: Car) {
    this.downPayment = form.value.downPayment;
    this.extra = form.value.extra;
    car.downPayment = this.downPayment;
    this.setOrderProgressInSessionStorage(6);
    this.updateCarOfTransaction(car);
    if (this.downPayment != null) {
      sessionStorage.setItem('downPayment', this.downPayment.toString());
    }
    if (this.extra != null) {
      sessionStorage.setItem('extra', this.extra.toString());
    }
  }

  // Gets a car object through the car component as a result of an eventEmitter
  // the car object is given as a value for the countInCar variable and saved into sessionStorage
  // and later on it will be saved along with the order.

  public getCountInCarData(event: Car) {
    this.countInCar = event;
    sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
  }

  // Save the chosen salesman and update the car of transaction with it.

  public saveSalesman(salesman: any, car: Car) {
    this.salesman = salesman;
    car.salesman = this.salesman;
    this.updateCarOfTransaction(car);
    this.setOrderProgressInSessionStorage(7);
    sessionStorage.setItem('salesman', this.salesman);
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
        this.selectedCars[this.clickedCarIndex] = data;
        sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
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

  public submitHandOver(form: any, car: Car) {
    this.updateCarWithHandoverDate(form, car);
    this.setOrderProgressInSessionStorage(8);
  }

  // Called in the submitHandOver method
  // It updates the carHandOver field of the car object
  // and updates that car.

  public updateCarWithHandoverDate(form: any, car: Car) {
    car.carHandover = new Date(form.value.handover);
    car.carHandover.setHours(0);
    car.carHandover.setMinutes(0);
    this.updateCarOfTransaction(car);
  }

  // If any changes happens on the down payment form then ngModelChange triggers this method
  // and the new value gets updated in sessionStorage, and later on it will be part of the order.

  public saveChangedDownPayment(form: FormGroup) {
    this.downPayment = form.value.downPayment;
    if (this.downPayment != null) {
      sessionStorage.setItem('downPayment', this.downPayment.toString());
      if (null != this.newOrder) {
        this.newOrder.downPayment = this.downPayment;
        sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      }
    }
  }

  // If any changes happens on the extra form then ngModelChange triggers this method
  // and the new value gets updated in sessionStorage, and later on it will be part of the order.

  public saveChangedExtra(form: FormGroup) {
    this.extra = form.value.extra;
    if (this.extra != null) {
      sessionStorage.setItem('extra', this.extra.toString());
      if (null != this.newOrder) {
        this.newOrder.extra = this.extra;
        sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      }
    }
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
    sessionStorage.setItem('descriptionsWithAmount', JSON.stringify(this.listOfDescriptionsWithAmount));
    sessionStorage.setItem('giftIndexList', JSON.stringify(this.giftIndexList));
    this.setOrderProgressInSessionStorage(9);
  }

  // When it's been decided whether an item will be charged the customer or A2, this method gets called.
  // If the customer gets the item as a gift, then this item's index gets saved in a list called giftIndexList

  public addToGiftIndexList(index: number): boolean {
    this.giftIndexList.push(index);
    return true;
  }

  // When it's been decided whether an item will be charged the customer or A2, this method gets called.
  // If the customer has to pay for the item and the list contained the index of the item
  // then this item index gets removed from the giftIndexList

  public removeFromGiftIndexList(index: number): boolean {
    this.giftIndexList.splice(index, 1);
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
      this.httpService.saveOrder(this.newOrder).subscribe(order => {
        this.prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage(order, car, witness1, witness2, targetRoute, warrantType, a2Representation, pickedTypeOfBuyingForCountInCar);
      });
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
      this.httpService.updateOrder(this.newOrder).subscribe(order => {
        this.prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage(<Order> order, car, witness1, witness2, targetRoute, warrantType, a2Representation, pickedTypeOfBuyingForCountInCar);
      });
    }
  }

  // Prepares the navigation to the clicked page. All the data traverse through the router.navigate method

  private prepareNavigationToOrderPageOrSellingPageOrWarrantPageOrInsurancePage(order: Order, car: Car, witness1: Witness, witness2: Witness, orderOrSellingOrWarrant: string, warrantType: string, a2Representation: string, pickedTypeOfBuyingForCountInCar: string) {
    if ('/orderPage' !== orderOrSellingOrWarrant && this.creditNeedsToBeRecalculated || !this.creditNeedsToBeRecalculated) {
      sessionStorage.setItem('order', JSON.stringify(this.newOrder));
      sessionStorage.setItem('orderedCar', JSON.stringify(car));
      this.router.navigate([orderOrSellingOrWarrant], {state: {data: {
            order: order,
            orderedCar: car,
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
            nameOfBuyer: this.nameOfBuyer,
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
    this.router.navigate(['/orderPage'], {state: {blankData: {
          orderedCar: car,
          blankPage: true
        }}});
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

  public navigateToOrderPage(car: Car) {
    this.setDataToNull();
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
}

