import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Order} from "../../models/order";
import {Description} from "../../models/description";
import {CarTimeInfoComponent} from "../../dialog/car-time-info/car-time-info.component";
import {Witness} from "../../models/witness";
import {WitnessPickerDialogComponent} from "../../dialog/witness-picker-dialog/witness-picker-dialog.component";
import {DescriptionWithAmount} from "../../models/descriptionWithAmount";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private countInCarSupplementForm: FormGroup;
  private filters = [{viewValue: 'Modell', value: 'name'}, {viewValue: 'Rendszám', value: 'plateNumber'}, {viewValue: 'Márka', value: 'type'}, {viewValue: 'Összes', value: 'all'}];
  private userFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Város', value: 'city'}];
  private selectedFilter: SelectedFilter;
  private selectedUserFilter: SelectedFilter;
  private companyFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Cégjegyzékszám', value: 'companyRegistrationNumber'}];
  private selectedCompanyFilter: SelectedFilter;
  private selectedCars = [];
  private selectedCarHeader = ['Márka', 'Modell', 'Rendszám'];
  public typeOfBuying = ['KÉSZPÉNZ', 'ÁTUTALÁS', 'HITEL'];
  private noMatch = false;
  private selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: boolean;
  private alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean;
  private checkedIndividual: boolean;
  private checkedCorporate: boolean;
  private previousOrNew: string;
  private individualOrCorporate: string;
  private selectedTypeOfBuying;
  private carOfTransaction: Car;
  private userSearchResult = new MatTableDataSource<Users>();
  private companySearchResult = new MatTableDataSource<Company>();
  private inheritanceTax: number;
  private orderProgress: number = 0;
  private askForInheritanceTaxCalculation: string;
  private wantInheritanceTaxCalculation: boolean;
  private addCountInCar: string;
  private thereIsCountInCar: boolean;
  private countInCarSupplement: CountInCarSupplement;
  private description: FormArray;
  private clickedCarIndex: number;
  private downPaymentForm: FormGroup;
  private downPayment: number;
  private extra: number;
  private userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  private companyDisplayedColumns: string[] = ['name', 'registrationNumber', 'representation', 'symbol'];
  private pickedUser: Users;
  private pickedCompany: Company;
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private creditData: Credit;
  private countInCar: Car;
  private salesman: string;
  private newOrder: Order;
  private newUser: Users;
  private newCompany: Company;
  private descriptionList: Description[] = [];
  private switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer: boolean = true;

  private descriptionForm: FormGroup;
  private descriptions: FormArray;
  private listOfDescriptionsWithAmount: DescriptionWithAmount[] = [];
  private chargedBehalf = ['AJÁNDÉK', 'VEVŐ FIZETI'];
  private giftIndexList = [];

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef,
              private router: Router,) {
    router.events
      .subscribe((event: NavigationEnd) => {
        if (event.url !== event.urlAfterRedirects && event.url !== '/filter') {
          this.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {

    if (sessionStorage.getItem('selectedCars')) {
      this.selectedCars = JSON.parse(sessionStorage.getItem('selectedCars'));
    }
    if (sessionStorage.getItem('clickedCarIndex')) {
      this.clickedCarIndex = Number(sessionStorage.getItem('clickedCarIndex'));
      this.carOfTransaction = this.selectedCars[this.clickedCarIndex];
    }
    if (sessionStorage.getItem('order')) {
      const order = JSON.parse(sessionStorage.getItem('order'));
      if (order.carId === this.carOfTransaction.id) {
        this.newOrder = JSON.parse(sessionStorage.getItem('order'));
        this.setFilterComponentVariablesAccordingToOrder(this.newOrder);
        this.getDataFromSessionStorageAfterRefresh();
      }
    } else {
      this.getDataFromSessionStorageAfterRefresh();
    }
    if (this.countInCarSupplement == null) {
      this.countInCarSupplementForm = this.formBuilder.group({
        countInPrice: [null],
        previousLoan: [null],
        previousBank: [null],
        loanType: [null],
      });
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
      this.downPaymentForm = this.formBuilder.group({
        downPayment: [null],
        extra: [null],
      });
    } else {
      this.downPaymentForm = this.formBuilder.group({
        downPayment: [this.downPayment],
        extra: [this.extra],
      });
    }
  }

  private createFormGroupForDescriptionWithAmount() {
    if (this.listOfDescriptionsWithAmount.length === 0) {
      this.descriptionForm = this.formBuilder.group({
        description: this.formBuilder.array([this.createDescriptionWithAmountRow(null)])
      });
    } else {
      this.setDescriptionForm();
    }
  }

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
    if (sessionStorage.getItem('pickedCompany')) {
      this.pickedCompany = JSON.parse(sessionStorage.getItem('pickedCompany'));
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
  }

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
  }

  private setDataToNull() {
    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = null;
    this.previousOrNew = null;
    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = null;
    this.individualOrCorporate = null;
    this.userSearchResult.data = null;
    this.companySearchResult.data = null;
    this.pickedUser = null;
    this.indexOfPickedUser = null;
    this.pickedCompany = null;
    this.indexOfPickedCompany = null;
    this.selectedUserFilter = null;
    this.selectedCompanyFilter = null;
    this.orderProgress = 0;
    this.wantInheritanceTaxCalculation = null;
    this.askForInheritanceTaxCalculation = null;
    this.thereIsCountInCar = null;
    this.addCountInCar = null;
    this.downPayment = null;
    this.descriptionList = [];
    this.description = null;
    this.descriptions = null;
    this.giftIndexList = [];
    this.listOfDescriptionsWithAmount = [];
    this.createFormGroupForDescriptionWithAmount();
    this.extra = null;
    this.salesman = null;
    this.selectedTypeOfBuying = null;
    this.newOrder = null;
    this.inheritanceTax = null;
    this.countInCar = null;
    this.countInCarSupplement = null;
    this.setOrderProgressInSessionStorage(0);
    this.removeItemsFromSessionStorage();
  }

  private setCountInCarSupplementForm(countInCarSupplement: CountInCarSupplement) {
    this.countInCarSupplementForm = this.formBuilder.group({
      countInPrice: [countInCarSupplement.countInPrice],
      previousLoan: [countInCarSupplement.previousLoan],
      previousBank: [countInCarSupplement.previousBank],
      loanType: [countInCarSupplement.loanType],
    });
  }

  private setDescriptionForm() {
    this.descriptionForm = this.formBuilder.group({
      description: this.formBuilder.array([]),
    });
    this.listOfDescriptionsWithAmount.forEach(descriptionWithAmount => {
      this.addNewDescriptionWithAmountRow(descriptionWithAmount);
    });
  }

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
      this.countInCar = order.countInCar;
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
    if (order.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
      if (order.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate) {
        this.newUser = order.users;
      } else {
        this.newCompany = order.company;
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

  private createDescriptionWithAmountRow(descriptionWithAmount: DescriptionWithAmount) {
    if (descriptionWithAmount == null) {
      return this.formBuilder.group({
        descriptionText: [null],
        charged: [null],
        amount: [null],
      });
    } else {
      return this.formBuilder.group({
        descriptionText: [descriptionWithAmount.description],
        charged: [descriptionWithAmount.charged],
        amount: [descriptionWithAmount.amount],
      });
    }
  }

  private addNewDescriptionWithAmountRow(descriptionWithAmount: DescriptionWithAmount) {
    this.descriptions = this.descriptionForm.get('description') as FormArray;
    this.descriptions.push(this.createDescriptionWithAmountRow(descriptionWithAmount));
  }

  private removeDescriptionWithAmountRow(index: number) {
    this.descriptions = this.descriptionForm.get('description') as FormArray;
    this.descriptions.removeAt(index);
  }

  public filterCars(form: any) {
    if (form.value.plateNumber && form.value.plateNumber.length < 6) {
      this.utilService.validPlateNumber = false;
    } else {
      sessionStorage.clear();
      let formValue = null;
      this.utilService.validPlateNumber = true;
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
        this.httpService.getSingleCar(formValue, this.selectedFilter.value).subscribe(data => {
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
        this.httpService.getAllCars().subscribe(data => {
          this.selectedCars = data;
          sessionStorage.setItem('selectedCars', JSON.stringify(data));
        })
      }
    }
  }

  public openUpdateModal(car: Car): void {
    this.utilService.carUpdate = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.data = car;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

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
      inheritanceTax: this.inheritanceTax,
    };

    const dialogRef = this.dialog.open(CreditDialogComponent, creditDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.creditData = result;
      if (this.creditData) {
        sessionStorage.setItem("credit", JSON.stringify(this.creditData));
      }
    });
  }

  public openCarTimeInfoDialog(car: Car) {
    const carTimeInfoDialogConfig = new MatDialogConfig();

    carTimeInfoDialogConfig.disableClose = true;
    carTimeInfoDialogConfig.width = '50%';

    carTimeInfoDialogConfig.data = {
      car: car,
      order: this.newOrder,
      clickedCarIndex: this.clickedCarIndex,
      selectedCars: this.selectedCars
    };

    const dialogRef = this.dialog.open(CarTimeInfoComponent, carTimeInfoDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.updateCarOfTransaction(result.car);
        if (result.remarkList != null) {
          this.descriptionList = result.remarkList;
          sessionStorage.setItem('descriptionList', JSON.stringify(this.descriptionList));
        }
        this.evaluateCarOfContract(result);
      }
    });
  }

  private evaluateCarOfContract(resultOfCarTimeInfoDialog: any) {
    if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
      this.carOfTransaction = resultOfCarTimeInfoDialog.car;
      this.navigateToOrderOrSellingOrWarrantPage(this.carOfTransaction,'/sellingPage', resultOfCarTimeInfoDialog.witness1, resultOfCarTimeInfoDialog.witness2, null);
    } else {
      this.countInCar = resultOfCarTimeInfoDialog.car;
      this.navigateToOrderOrSellingOrWarrantPage(this.countInCar,'/sellingPage', resultOfCarTimeInfoDialog.witness1, resultOfCarTimeInfoDialog.witness2, null);
    }
  }

  public openWitnessPickerModal(): void {
    const witnessPickerDialogConfig = new MatDialogConfig();

    witnessPickerDialogConfig.disableClose = true;
    witnessPickerDialogConfig.width = '30%';

    const dialogRef = this.dialog.open(WitnessPickerDialogComponent, witnessPickerDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.navigateToOrderOrSellingOrWarrantPage(this.carOfTransaction, '/warrantPage', result.witness1, result.witness2, result.warrantType);
      }
    });
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private filterUser(form: any) {
    this.httpService.getUser(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value).subscribe(data => {
      this.userSearchResult.data = data;
      this.changeDetectorRefs.detectChanges();
      sessionStorage.setItem('userSearchData', JSON.stringify(data));
    });
    this.setOrderProgressInSessionStorage(2);
  }

  private filterCompany(form: any) {
    this.httpService.getCompany(this.setFormValuesToUpperCase(form), this.selectedCompanyFilter.value).subscribe(data => {
      this.companySearchResult.data = data;
      this.changeDetectorRefs.detectChanges();
      sessionStorage.setItem('companySearchData', JSON.stringify(data));
    });
    this.setOrderProgressInSessionStorage(2);
  }

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

  private selectBetweenNewAndPreviousCustomer(previousOrNew: string, selection:boolean) {
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
    sessionStorage.setItem('alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready', this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready.toString())
  }

  private changeCheckBoxValuesToNull() {
    this.individualOrCorporate = null;
    this.checkedIndividual = null;
    this.checkedCorporate = null;
    this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = null;
    this.selectedTypeOfBuying = null;
    this.askForInheritanceTaxCalculation = null;
  }

  private setIndOrCorpCheckboxValue(indOrCorp: string, selection: boolean) {
    this.individualOrCorporate = indOrCorp;
    if (indOrCorp === 'individual') {
      this.checkedIndividual = selection;
      if (this.checkedIndividual) {
        this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = true;
      }
    } else if (indOrCorp === 'corporate') {
      this.checkedCorporate = selection;
      if (this.checkedCorporate) {
        this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = false;
      }
    }
    sessionStorage.setItem('selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate', this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate.toString());
  }

  private setInheritanceTaxCheckboxValue(wantOrNotCalculation: string, car: Car, selection: boolean) {
    if (wantOrNotCalculation === 'wantCalculation') {
      if (selection) {
        this.askForInheritanceTaxCalculation = 'wantCalculation';
        this.wantInheritanceTaxCalculation = true;
        this.countInheritanceTax(car);
      } else {
        this.inheritanceTax = null;
        this.askForInheritanceTaxCalculation = 'dontWantCalculation';
        this.wantInheritanceTaxCalculation = false;
        this.setOrderProgressInSessionStorage(3);
      }
    } else if (wantOrNotCalculation === 'dontWantCalculation') {
      if (selection) {
        this.inheritanceTax = null;
        this.askForInheritanceTaxCalculation = 'dontWantCalculation';
        this.wantInheritanceTaxCalculation = false;
        this.setOrderProgressInSessionStorage(3);
      } else {
        this.askForInheritanceTaxCalculation = 'wantCalculation';
        this.wantInheritanceTaxCalculation = true;
        this.countInheritanceTax(car);
      }
    }
    sessionStorage.setItem('wantInheritanceTaxCalculation', this.wantInheritanceTaxCalculation.toString());
  }

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
      stringAge = 'mediumAge';
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
        this.inheritanceTax = Number(utility.value) + (chargeForInheritanceTax * car.kwh);
        sessionStorage.setItem('inheritanceTax', this.inheritanceTax.toString());
        this.setOrderProgressInSessionStorage(3);
      });
    });
  }

  private setAlreadyOrNewCustomerSelectorAndCarOfTransaction(car: Car, index: number) {
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

  private setCountInCar(isOrNotCountIn: string, selection: boolean) {
    if (isOrNotCountIn === 'countIn') {
      if (selection) {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      } else {
        this.addCountInCar = 'noCountIn';
        this.thereIsCountInCar = false;
        this.countInCar = null;
        this.setOrderProgressInSessionStorage(5);
      }
    } else if (isOrNotCountIn === 'noCountIn') {
      if (selection) {
        this.addCountInCar = 'noCountIn';
        this.thereIsCountInCar = false;
        this.countInCar = null;
        this.setOrderProgressInSessionStorage(5);
      } else {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      }
    }
    sessionStorage.setItem('thereIsCountInCar', this.thereIsCountInCar.toString());
  }

  private setAllOrderDataAfterHttpCall(order: Order, car: Car) {
    this.setFilterComponentVariablesAccordingToOrder(order);
    if (this.countInCarSupplement) {
      this.setCountInCarSupplementForm(this.countInCarSupplement);
    }
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
    this.carOfTransaction = car;
  }

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

  private selectTypeOfBuying(type: any, car: Car) {
    this.selectedTypeOfBuying = type;
    this.carOfTransaction.typeOfBuying = type;
    this.httpService.updateCar(this.carOfTransaction).subscribe(data => {
    });
    if (this.selectedTypeOfBuying === 'HITEL') {
      this.openCreditModal(car);
    }
    this.setOrderProgressInSessionStorage(7);
    sessionStorage.setItem('selectedTypeOfBuying', this.selectedTypeOfBuying);
  }

  private clearSelectedCars() {
    this.setDataToNull();
    this.selectedCars = [];
    this.setOrderProgressInSessionStorage(0);
  }

  private setOrderProgressInSessionStorage(stage: number) {
    if (this.newOrder == null || stage === 10) {
      this.orderProgress = stage;
      sessionStorage.setItem('orderProgress', this.orderProgress.toString());
    }
  }

  private orderOnProgressWithUser(event: string) {
    if (event === 'saved') {
      this.setOrderProgressInSessionStorage(2);
    }
  }

  private addNewUserToOrder(event: Users) {
    this.pickedUser = event;
  }

  private addNewCompanyToOrder(event: Company) {
    this.pickedCompany = event;
  }

  private orderOnProgressWithCar(event: string) {
    if (event === 'saved') {
      this.setOrderProgressInSessionStorage(4);
    }
  }

  private saveCountInCarSupplement(form: FormGroup) {
    this.countInCarSupplement = new CountInCarSupplement(
      form.value.countInPrice,
      form.value.previousLoan,
      form.value.previousBank,
      form.value.loanType);
    sessionStorage.setItem('countInCarSupplement', JSON.stringify(this.countInCarSupplement));
    this.setOrderProgressInSessionStorage(5);
  }

  private saveDownPaymentAmount(form: FormGroup, car: Car) {
    this.downPayment = form.value.downPayment;
    this.extra = form.value.extra;
    car.downPayment = this.downPayment;
    this.setOrderProgressInSessionStorage(6);
    this.updateCarOfTransaction(car);
    sessionStorage.setItem('downPayment', this.downPayment.toString());
    sessionStorage.setItem('extra', this.extra.toString());
  }

  private pickUser(index: number) {
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
      pickedUserFromDataTable.healthcareNumber);
    sessionStorage.setItem('pickedUser', JSON.stringify(this.pickedUser));
    sessionStorage.setItem('indexOfPickedUser', this.indexOfPickedUser.toString());
  }

  private pickCompany(index: number) {
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
  }

  private getCountInCarData(event: Car) {
    this.countInCar = event;
    sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
  }

  private saveSalesman(salesman: any, car: Car) {
    this.salesman = salesman;
    car.salesman = this.salesman;
    this.updateCarOfTransaction(car);
    this.setOrderProgressInSessionStorage(8);
    sessionStorage.setItem('salesman', this.salesman);
  }

  private updateCarOfTransaction(car: Car) {
    this.httpService.updateCar(car).subscribe(data => {
      if (this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer) {
        this.carOfTransaction = data;
        this.selectedCars[this.clickedCarIndex] = data;
        sessionStorage.setItem('selectedCars', JSON.stringify(this.selectedCars));
      } else {
        this.countInCar = data;
        sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
        this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer = true;
      }
    }, error => {
      console.log(error);
    });
  }

  private submitHandOver(form: any, car: Car) {
    car.carHandover = form.value.handover;
    this.updateCarOfTransaction(car);
    this.setOrderProgressInSessionStorage(9);
  }

  private saveDescriptions(descriptionForm: FormGroup) {
    descriptionForm.value.description.forEach(descriptionWithAmount => {
      const descriptionAmount = descriptionWithAmount.charged === 'AJÁNDÉK' ? 0 : descriptionWithAmount.amount;
      const description = new DescriptionWithAmount(null, descriptionWithAmount.descriptionText, descriptionAmount, descriptionWithAmount.charged);
      this.listOfDescriptionsWithAmount.push(description);
    });
    sessionStorage.setItem('descriptionsWithAmount', JSON.stringify(this.listOfDescriptionsWithAmount));
    sessionStorage.setItem('giftIndexList', JSON.stringify(this.giftIndexList));
    this.setOrderProgressInSessionStorage(10);
  }

  private addToGiftIndexList(index: number) {
    this.giftIndexList.push(index);
  }

  private removeFromGiftIndexList(index: number) {
    this.giftIndexList.splice(index, 1);
  }

  private navigateToOrderOrSellingOrWarrantPage(car: Car, targetRoute: string,  witness1: Witness, witness2: Witness, warrantType: string) {
    if (this.downPaymentForm.value.downPayment !== this.carOfTransaction.downPayment) {
      car.downPayment = this.downPaymentForm.value.downPayment;
      this.updateCarOfTransaction(car);
    }
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
        this.pickedUser,
        this.pickedCompany,
        this.countInCarSupplement,
        this.creditData,
        this.countInCar,
        car.id,
        this.descriptionList,
        this.listOfDescriptionsWithAmount);
      this.httpService.saveOrder(this.newOrder).subscribe(order => {
        this.prepareNavigationToOrderPageOrSellingPageOrWarrantPage(order, car, witness1, witness2, targetRoute, warrantType);
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
      this.newOrder.users = this.pickedUser;
      this.newOrder.company = this.pickedCompany;
      this.newOrder.countInCarSupplement = this.countInCarSupplement;
      this.newOrder.credit = this.creditData;
      this.newOrder.countInCar = this.countInCar;
      this.newOrder.carId = car.id;
      this.newOrder.description = this.descriptionList;
      console.log(this.newOrder);
      this.httpService.updateOrder(this.newOrder).subscribe(order => {
        this.prepareNavigationToOrderPageOrSellingPageOrWarrantPage(<Order> order, car, witness1, witness2, targetRoute, warrantType);
      });
    }
  }

  private prepareNavigationToOrderPageOrSellingPageOrWarrantPage(order: Order, car: Car, witness1: Witness, witness2: Witness, orderOrSellingOrWarrant: string, warrantType: string) {
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
        }}});
  }

  private gatherSellingPageInfo(car: Car, sellOrBuy: string) {
    this.switchBetweenA2AsBuyerOrSellerTrueIfSellerFalseIfBuyer = sellOrBuy === 'sell';
    this.openCarTimeInfoDialog(car);
  }

  private navigateToBlankOrderPage(car: Car) {
    this.router.navigate(['/orderPage'], {state: {blankData: {
          orderedCar: car,
          blankPage: true
        }}});
  }

  private openWitnessPickerForWarrantPage() {
    this.openWitnessPickerModal();
  }
}
