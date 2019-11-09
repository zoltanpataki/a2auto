import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {NavigationExtras, Router} from "@angular/router";
import {Order} from "../../models/order";

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
  private selectedCarHeader = ['Márka', 'Modell', 'Rendszám', ''];
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
  private downpayment: number;
  private userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  private companyDisplayedColumns: string[] = ['name', 'registrationNumber', 'representation', 'symbol'];
  private pickedUser: Users;
  private pickedCompany: Company;
  private indexOfPickedUser: number;
  private indexOfPickedCompany: number;
  private creditData: Credit;
  private countInCar: Car;
  private salesmanForm: FormGroup;
  private salesman: string;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef,
              private router: Router,) { }

  ngOnInit() {
    // this.orderProgress = Number(sessionStorage.getItem('orderProgress'));
    if (sessionStorage.getItem('selectedCars')) {
      this.selectedCars = JSON.parse(sessionStorage.getItem('selectedCars'));
    }
    if (sessionStorage.getItem('countInCarSupplement')) {
      this.countInCarSupplement = JSON.parse(sessionStorage.getItem('countInCarSupplement'));
    }
    if (this.countInCarSupplement == null) {
      this.countInCarSupplementForm = this.formBuilder.group({
        countInPrice: [null],
        previousLoan: [null],
        previousBank: [null],
        loanType: [null],
        description: this.formBuilder.array([this.createDescriptionRow(null)]),
      });
    } else {
      this.countInCarSupplementForm = this.formBuilder.group({
        countInPrice: [this.countInCarSupplement.countInPrice],
        previousLoan: [this.countInCarSupplement.previousLoan],
        previousBank: [this.countInCarSupplement.previousBank],
        loanType: [this.countInCarSupplement.loanType],
        description: this.formBuilder.array([]),
      });
      this.countInCarSupplement.description.forEach(description => {
        this.addNewDescriptionRow(description.description);
      });
    }
    this.downPaymentForm = this.formBuilder.group({
      downPayment: [null],
    });

    this.salesmanForm = this.formBuilder.group({
      salesman: [null],
    });
  }

  private createDescriptionRow(description: string): FormGroup {
    return this.formBuilder.group({
      description: [description],
    });
  }

  private addNewDescriptionRow(description: string) {
    this.description = this.countInCarSupplementForm.get('description') as FormArray;
    this.description.push(this.createDescriptionRow(description));
  }

  private removeDescriptionRow(index: number) {
    this.description = this.countInCarSupplementForm.get('description') as FormArray;
    this.description.removeAt(index);
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

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  private filterUser(form: any) {
    this.httpService.getUser(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value).subscribe(data => {
      this.userSearchResult.data = data;
      this.changeDetectorRefs.detectChanges();
    });
    this.setOrderProgressInSessionStorage(2);
  }

  private filterCompany(form: any) {
    this.httpService.getCompany(this.setFormValuesToUpperCase(form), this.selectedCompanyFilter.value).subscribe(data => {
      this.companySearchResult.data = data;
      this.changeDetectorRefs.detectChanges();
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

    if (car.carOrTruck === 'SZEMÉLYGÉPJÁRMŰ') {
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

  private setCountInCar(isOrNotCountIn: string, selection: boolean) {
    if (isOrNotCountIn === 'countIn') {
      if (selection) {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      } else {
        this.addCountInCar = 'noCountIn'
        this.thereIsCountInCar = false;
        this.setOrderProgressInSessionStorage(4);
      }
    } else if (isOrNotCountIn === 'noCountIn') {
      if (selection) {
        this.addCountInCar = 'noCountIn'
        this.thereIsCountInCar = false;
        this.setOrderProgressInSessionStorage(4);
      } else {
        this.addCountInCar = 'countIn';
        this.thereIsCountInCar = true;
      }
    }
    sessionStorage.setItem('thereIsCountInCar', this.thereIsCountInCar.toString());
  }

  private setAlreadyOrNewCustomerSelectorAndCarOfTransaction(car: Car, index: number) {
    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = null;
    this.selectedUserFilter = null;
    this.orderProgress = this.orderProgress > 0 ? this.orderProgress : 0;
    this.setOrderProgressInSessionStorage(this.orderProgress);
    this.carOfTransaction = car;
    this.clickedCarIndex = index;
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
      console.log(data);
    });
    if (this.selectedTypeOfBuying === 'HITEL') {
      this.openCreditModal(car);
    }
    this.setOrderProgressInSessionStorage(7);
    sessionStorage.setItem('selectedTypeOfBuying', this.selectedTypeOfBuying);
  }

  private clearSelectedCars() {
    this.selectedCars = [];
    this.setOrderProgressInSessionStorage(0);
  }

  private setOrderProgressInSessionStorage(stage: number) {
    this.orderProgress = stage;
    sessionStorage.setItem('orderProgress', this.orderProgress.toString());
  }

  private orderOnProgressWithUser(event: string) {
    if (event === 'saved') {
      this.setOrderProgressInSessionStorage(2);
    }
  }

  private orderOnProgressWithCar(event: string) {
    if (event === 'saved') {
      this.setOrderProgressInSessionStorage(4);
    }
  }

  private saveCountInCarSupplement(form: FormGroup) {
    this.countInCarSupplement = new CountInCarSupplement(form.value.countInPrice, form.value.previousLoan, form.value.previousBank, form.value.loanType, form.value.description);
    sessionStorage.setItem('countInCarSupplement', JSON.stringify(this.countInCarSupplement));
    this.setOrderProgressInSessionStorage(5);
  }

  private saveDownPaymentAmount(form: FormGroup) {
    this.downpayment = form.value.downPayment;
    sessionStorage.setItem('downPayment', this.downpayment.toString());
    this.setOrderProgressInSessionStorage(6);
  }

  private pickUser(index: number) {
    this.indexOfPickedUser = index;
    const pickedUserFromDataTable = this.userSearchResult.data[index];
    this.pickedUser = new Users(pickedUserFromDataTable.fullName, pickedUserFromDataTable.birthName, pickedUserFromDataTable.zipCode, pickedUserFromDataTable.city, pickedUserFromDataTable.phoneNumber, pickedUserFromDataTable.email, pickedUserFromDataTable.nameOfMother, pickedUserFromDataTable.birthDate, pickedUserFromDataTable.personNumber, pickedUserFromDataTable.idCardNumber, pickedUserFromDataTable.dueTimeOfIdCard, pickedUserFromDataTable.drivingLicenceNumber, pickedUserFromDataTable.dueTimeOfDrivingLicence, pickedUserFromDataTable.taxNumber, pickedUserFromDataTable.healthcareNumber);
    sessionStorage.setItem('pickedUser', JSON.stringify(this.pickedUser));
  }

  private pickCompany(index: number) {
    this.indexOfPickedCompany = index;
    const pickedCompanyFromDataTable = this.companySearchResult.data[index];
    this.pickedCompany = new Company(pickedCompanyFromDataTable.id, pickedCompanyFromDataTable.name, pickedCompanyFromDataTable.address, pickedCompanyFromDataTable.companyRegistrationNumber, pickedCompanyFromDataTable.representation, pickedCompanyFromDataTable.taxNumber, pickedCompanyFromDataTable.phoneNumber, pickedCompanyFromDataTable.email);
    sessionStorage.setItem('pickedCompany', JSON.stringify(this.pickedCompany));
  }

  private getCountInCarData(event: Car) {
    this.countInCar = event;
    sessionStorage.setItem('countInCar', JSON.stringify(this.countInCar));
  }

  private saveSalesman(form: FormGroup, car: Car) {
    this.salesman = form.value.salesman;
    car.salesman = this.salesman;
    this.httpService.updateCar(car).subscribe(data => {
      this.setOrderProgressInSessionStorage(8);
    });
  }

  private navigateToOrderPage(car: Car) {
    const companyOrdered = this.companySearchResult.data.length > 0 ? this.companySearchResult.data[this.indexOfPickedCompany] : null;
    let userOrdered = this.userSearchResult.data.length > 0 ? this.userSearchResult.data[this.indexOfPickedUser] : null;
    const newOrder = new Order(null, this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready, this.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate, this.wantInheritanceTaxCalculation, this.inheritanceTax, this.thereIsCountInCar, this.downpayment, this.selectedTypeOfBuying, userOrdered, companyOrdered, this.countInCarSupplement, this.creditData, this.countInCar, car.id);
    console.log(newOrder);
    this.httpService.saveOrder(newOrder).subscribe(order => {
      this.router.navigate(['/orderPage'], {state: {data: {order: order, orderedCar: car}}});
    });
  }

  private navigateToSellingPage() {
    this.router.navigate(['/sellingPage']);
  }

  private navigateToGdprPage() {
    this.router.navigate(['/gdprPage']);
  }
}
