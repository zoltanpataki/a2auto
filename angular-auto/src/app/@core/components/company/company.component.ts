import {Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectorRef} from '@angular/core';
import {Company} from "../../models/company";
import {HttpService} from "../../services/http.service";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Address} from "../../models/address";
import {filter} from "rxjs/operators";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {SelectedFilter} from "../../models/selectedFilter";
import { MatTableDataSource } from '@angular/material/table';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {


  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Input('companyData')
  public companyData: Company;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newCompany: EventEmitter<any> = new EventEmitter<any>();
  public fields = {city: 'Város', address: 'Cím', country: 'Ország'};
  public fields2 = {representation: 'Képviselő', taxNumber: 'Adószám', phoneNumber: 'Telefonszám'};
  public keepOriginalOrder = (a, b) => a.key;
  public currentUrl;
  public isCompleteAddress: boolean = true;
  isValidCompanyRegistrationNumber: boolean = true;
  private hyphen = '-';
  public tooLongFieldValue: string = '';
  public isThereLongFieldValue: boolean = false;

  public companyFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Cégjegyzékszám', value: 'companyRegistrationNumber'}];
  public selectedCompanyFilter: SelectedFilter;
  public companySearchResult = new MatTableDataSource<Company>();
  public indexOfPickedCompany: number;
  public companyDisplayedColumns: string[] = ['name', 'registrationNumber', 'representation', 'symbol'];
  public clearCompanyDataButtonPressed: boolean = false;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              public router: Router,
              private changeDetectorRefs: ChangeDetectorRef,) {
    this.route.url.subscribe(activtedUrl => {
      this.currentUrl = window.location.pathname;
    });
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newUser') {
          sessionStorage.removeItem('newUser');
          sessionStorage.removeItem('userSearchDataOnUserPage');
          sessionStorage.removeItem('pickedUserOnUserPage');
          sessionStorage.removeItem('indexOfPickedUserOnUserPage');
        }
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newCompany') != null) {
      this.companyData = JSON.parse(sessionStorage.getItem('newCompany'));
    }
    if (sessionStorage.getItem('companySearchDataOnCompanyPage') != null) {
      this.companySearchResult.data = JSON.parse(sessionStorage.getItem('companySearchDataOnCompanyPage'));
    }
    if (sessionStorage.getItem('pickedCompanyOnCompanyPage') != null) {
      this.companyData = JSON.parse(sessionStorage.getItem('pickedCompanyOnCompanyPage'));
    }
    if (sessionStorage.getItem('indexOfPickedCompanyOnCompanyPage') != null) {
      this.indexOfPickedCompany = Number(sessionStorage.getItem('indexOfPickedCompanyOnCompanyPage'));
    }
    if (this.companyData == null) {
      this.companyData = new Company(null, null, new Address(null, null, null, null, null), null, null, null, null, null);
    } else {
      this.emailFormControl.setValue(this.companyData.email);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveCompany(form: any) {
    if (!this.emailFormControl.hasError('email')
      && this.nullCheckOnAddress(form)
      && this.validateCompanyRegistrationNumber(form.value.companyRegistrationNumber)
      && this.validateFormFieldLength(form.value)) {
      this.isCompleteAddress = true;
      if (this.companyData.id == null) {
        this.httpService.saveCompany(this.createCompanyObj(form, false)).subscribe(data => {
          this.companyData = data;
          this.orderProgress.emit('saved');
          this.newCompany.emit(data);
          this.utilService.openSnackBar('A társaság sikeresen mentve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A társaságot nem sikerült menteni!', 'Hiba :(');
        });
      } else {
        this.httpService.saveCompany(this.createCompanyObj(form, true)).subscribe(data => {
          this.companyData = data;
          this.orderProgress.emit('saved');
          this.newCompany.emit(data);
          this.utilService.openSnackBar('A társaság sikeresen frissítve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A társaságot nem sikerült frissíteni!', 'Hiba :(');
        });
      }
    } else if (!this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = false;
    }
  }

  private nullCheckOnAddress(form: any): boolean {
    let nullCounter = 0;
    nullCounter = form.value.zipcode == null || form.value.zipcode.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.city == null || form.value.city.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.address == null || form.value.address.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    return Math.abs(nullCounter) === 3;
  }

  public itemChanged(form: any) {
    if (Object.entries(form.value).length === 0 && form.value.constructor === Object || this.clearCompanyDataButtonPressed === true) {
      //we don't do anything, the object is empty
    } else {
      let company;
      if (this.companyData.id == null) {
        company = this.createCompanyObj(form, false);
      } else {
        company = this.createCompanyObj(form, true);
      }
      sessionStorage.setItem('newCompany', JSON.stringify(company));
    }
  }

  public checkZipCode(form: any) {
    if (form.value.zipcode && form.value.zipcode.length === 4 && !isNaN(form.value.zipcode)) {
      this.httpService.callZipCodeService(form.value.zipcode).subscribe(data => {
        this.companyData.address.city = (data.zipCity).toUpperCase();
        form.value.city = (data.zipCity).toUpperCase();
        this.itemChanged(form);
      });
    }
  }

  private createCompanyObj(form: any, updateOrNew: boolean): Company {
    const capitalObject = this.transformToCapitalData(form);
    if (updateOrNew) {
      return new Company(
        this.companyData.id,
        capitalObject['capitalName'],
        new Address(
          this.companyData.address.id,
          form.value.zipcode,
          capitalObject['capitalCountry'],
          capitalObject['capitalCity'],
          capitalObject['capitalAddress'],
          ),
        capitalObject['capitalCompanyRegistrationNumber'],
        capitalObject['capitalRepresentation'],
        capitalObject['capitalTaxNumber'],
        capitalObject['capitalPhoneNumber'],
        capitalObject['capitalEmail']
        )
    } else {
      return new Company(
        null,
        capitalObject['capitalName'],
        new Address(
          null,
          form.value.zipcode,
          capitalObject['capitalCountry'],
          capitalObject['capitalCity'],
          capitalObject['capitalAddress'],
        ),
        capitalObject['capitalCompanyRegistrationNumber'],
        capitalObject['capitalRepresentation'],
        capitalObject['capitalTaxNumber'],
        capitalObject['capitalPhoneNumber'],
        capitalObject['capitalEmail']
      )
    }
  }

  private transformToCapitalData(form: any): Object {
    const capitalObject = {};
    capitalObject['capitalName'] = form.value.name != null ? form.value.name.toUpperCase() : null;
    capitalObject['capitalCity'] = form.value.city != null ? form.value.city.toUpperCase() : null;
    capitalObject['capitalCountry'] = form.value.country != null ? form.value.country.toUpperCase() : null;
    capitalObject['capitalAddress'] = form.value.address != null ? form.value.address.toUpperCase() : null;
    capitalObject['capitalCompanyRegistrationNumber'] = form.value.companyRegistrationNumber != null ? form.value.companyRegistrationNumber.toUpperCase() : null;
    capitalObject['capitalEmail'] = this.emailFormControl.value != null ? this.emailFormControl.value.toUpperCase() : null;
    capitalObject['capitalRepresentation'] = form.value.representation != null ? form.value.representation.toUpperCase() : null;
    capitalObject['capitalTaxNumber'] = form.value.taxNumber != null ? form.value.taxNumber.toUpperCase() : null;
    capitalObject['capitalPhoneNumber'] = form.value.phoneNumber != null ? form.value.phoneNumber.toUpperCase() : null;
    return capitalObject;
  }

  public clearCompanyData() {
    this.clearCompanyDataButtonPressed = true;
    this.companySearchResult.data = null;
    this.indexOfPickedCompany = null;
    this.companyData = null;
    this.selectedCompanyFilter = null;
    sessionStorage.removeItem('newCompany');
    sessionStorage.removeItem('companySearchDataOnCompanyPage');
    sessionStorage.removeItem('pickedCompanyOnCompanyPage');
    sessionStorage.removeItem('indexOfPickedCompanyOnCompanyPage');
    this.ngOnInit();
  }

  public marshallCompanyRegNumber(form: any) {
    let regNumber = form.value.companyRegistrationNumber.substring(0, 10);
    regNumber = regNumber.replace(/-/g, '');
    let resultNumber = '';
    for (let i = 0; i < regNumber.length; i++) {
      resultNumber = resultNumber + regNumber.charAt(i);
      if (resultNumber.length === 2 || resultNumber.length === 5) {
        resultNumber = resultNumber + this.hyphen;
      }
    }
    this.companyData.companyRegistrationNumber = resultNumber;
  }

  private validateCompanyRegistrationNumber(regNumber: string): boolean {
    if (regNumber != null) {
      this.isValidCompanyRegistrationNumber = true;
      const regNumberParts = regNumber.split('-', 3);
      regNumberParts.forEach(part => {
        if (isNaN(Number(part))) {
          this.isValidCompanyRegistrationNumber = false;
        }
      });
      return this.isValidCompanyRegistrationNumber;
    }
  }

  private validateFormFieldLength(formValue: any): boolean {
    const formValues = Object.values(formValue);
    for (const value of formValues) {
      if (typeof value === "string" && value.length > 50) {
        this.tooLongFieldValue = value;
        this.isThereLongFieldValue = true;
        return false;
      }
    }
    return true;
  }

  public filterCompany(form: any) {
    sessionStorage.removeItem('indexOfPickedCompanyOnUserPage');
    this.indexOfPickedCompany = null;
    if (this.validateFormFieldLength(form.value)) {
      this.httpService.getCompany(this.setFormValuesToUpperCase(form), this.selectedCompanyFilter.value).subscribe(data => {
        this.companySearchResult.data = data;
        this.changeDetectorRefs.detectChanges();
        sessionStorage.setItem('companySearchDataOnCompanyPage', JSON.stringify(data));
      });
    }
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

  public pickCompany(index: number) {
    this.indexOfPickedCompany = index;
    const pickedCompanyFromDataTable = this.companySearchResult.data[index];
    this.companyData = new Company(
      pickedCompanyFromDataTable.id,
      pickedCompanyFromDataTable.name,
      pickedCompanyFromDataTable.address,
      pickedCompanyFromDataTable.companyRegistrationNumber,
      pickedCompanyFromDataTable.representation,
      pickedCompanyFromDataTable.taxNumber,
      pickedCompanyFromDataTable.phoneNumber,
      pickedCompanyFromDataTable.email);
    sessionStorage.setItem('pickedCompanyOnCompanyPage', JSON.stringify(this.companyData));
    sessionStorage.setItem('indexOfPickedCompanyOnCompanyPage', this.indexOfPickedCompany.toString());
  }
}
