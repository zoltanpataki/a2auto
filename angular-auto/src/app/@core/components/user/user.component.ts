import {Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectorRef} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Users} from "../../models/users";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";
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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Input('userData')
  public userData: Users;
  @Output()
  public orderProgress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public newUser: EventEmitter<any> = new EventEmitter<any>();
  public fieldsOne = {
    fullName: 'Teljes Név',
    birthName: 'Születéskori Név',
    phoneNumber: 'Telefonszám',
  };
  public fieldsAddress = {
    city: 'Város',
    address: 'Lakcím'
  };
  public fieldsTwo = {
    birthPlace: 'Születési hely',
    nameOfMother: 'Anyja neve',
    idCardNumber: 'Személyi igazolvány szám',
    drivingLicenceNumber: 'Vezetői engedély száma'
  };
  public fieldsThree = {
    nationality: 'Állampolgárság',
    personNumber: 'Személyi szám',
    taxNumber: 'Adószám',
  };
  public fieldsFour = {
    dueTimeOfDrivingLicence: 'Vezetői engedély megszerzése',
    dueTimeOfIdCard: 'Személyi igazolvány lejárata'
  };
  public keepOriginalOrder = (a, b) => a.key;
  public currentUrl;
  public isCompleteAddress: boolean = true;
  public tooLongFieldValue: string = '';
  public isThereLongFieldValue: boolean = false;

  public selectedUserFilter: SelectedFilter;
  public userFilters = [{viewValue: 'Név', value: 'name'}, {viewValue: 'Város', value: 'city'}];
  public userSearchResult = new MatTableDataSource<Users>();
  public indexOfPickedUser: number;
  public userDisplayedColumns: string[] = ['name', 'city', 'taxNumber', 'symbol'];
  public clearUserDataButtonPressed: boolean = false;

  constructor(private httpService: HttpService,
              public utilService: UtilService,
              private route: ActivatedRoute,
              public router: Router,
              private changeDetectorRefs: ChangeDetectorRef,) {
    this.route.url.subscribe(activtedUrl => {
      this.currentUrl = window.location.pathname;
    });
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url !== '/newCar') {
          sessionStorage.removeItem('newCar');
        }
        if (event.url !== '/newCompany') {
          sessionStorage.removeItem('newCompany');
          sessionStorage.removeItem('companySearchDataOnCompanyPage');
          sessionStorage.removeItem('pickedCompanyOnCompanyPage');
          sessionStorage.removeItem('indexOfPickedCompanyOnCompanyPage');
        }
        if (event.url !== '/filter' && event.url !== '/orderPage' && event.url !== 'sellingPage' && event.url !== '/warrantPage' && event.url !== '/insurancePage') {
          this.utilService.removeItemsFromSessionStorage();
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('newUser') != null) {
      this.userData = JSON.parse(sessionStorage.getItem('newUser'));
    }
    if (sessionStorage.getItem('userSearchDataOnUserPage') != null) {
      this.userSearchResult.data = JSON.parse(sessionStorage.getItem('userSearchDataOnUserPage'));
    }
    if (sessionStorage.getItem('pickedUserOnUserPage') != null) {
      this.userData = JSON.parse(sessionStorage.getItem('pickedUserOnUserPage'));
    }
    if (sessionStorage.getItem('indexOfPickedUserOnUserPage') != null) {
      this.indexOfPickedUser = Number(sessionStorage.getItem('indexOfPickedUserOnUserPage'));
    }
    if (this.userData == null) {
      this.userData = new Users(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'MAGYAR');
    } else {
      this.emailFormControl.setValue(this.userData.email);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveUser(form: any) {
    if (!this.emailFormControl.hasError('email')
      && this.nullCheckOnAddress(form)
      && this.validateFormFieldLength(form.value)) {
      this.isCompleteAddress = true;
      if (this.userData.id == null) {
        this.httpService.saveUser(this.createUserObj(form, false)).subscribe(data => {
          this.userData = data;
          if (this.router.url === '/filter') {
            console.log('emitted');
            this.orderProgress.emit('saved');
            this.newUser.emit(data);
          }
          this.utilService.openSnackBar('A felhasználó sikeresen mentve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A felhasználót nem sikerült menteni!', 'Hiba :(');
        });
      } else {
        this.httpService.saveUser(this.createUserObj(form, true)).subscribe(data => {
          this.userData = data;
          if (this.router.url === '/filter') {
            console.log('emitted');
            this.orderProgress.emit('saved');
            this.newUser.emit(data);
          }
          this.utilService.openSnackBar('A felhasználó sikeresen frissítve!', 'Szuper :)');
        }, error => {
          this.orderProgress.emit('unsaved');
          this.utilService.openSnackBar('A felhasználót nem sikerült frissíteni!', 'Hiba :(');
        });
      }
    } else if (!this.nullCheckOnAddress(form)) {
      this.isCompleteAddress = false;
    }
  }

  public checkZipCode(form: any) {
    if (form.value.zipCode && form.value.zipCode.length === 4 && !isNaN(form.value.zipCode)) {
      this.httpService.callZipCodeService(form.value.zipCode).subscribe(data => {
        this.userData.city = (data.zipCity).toUpperCase();
        form.value.city = (data.zipCity).toUpperCase();
        this.itemChanged(form, 'checkZipCode');
      });
    }
  }

  public createUserObj(form: any, updateOrNew: boolean): Users {
    const capitalObject = this.transformToCapitalData(form);
    if (updateOrNew) {
      return new Users(
        this.userData.id,
        capitalObject['capitalFullName'],
        capitalObject['capitalBirthName'],
        form.value.zipCode,
        capitalObject['capitalCity'],
        capitalObject['capitalAddress'],
        capitalObject['capitalBirthPlace'],
        form.value.phoneNumber,
        capitalObject['capitalEmail'],
        capitalObject['capitalNameOfMother'],
        form.value.birthDate,
        capitalObject['capitalPersonNumber'],
        capitalObject['capitalIdCardNumber'],
        form.value.dueTimeOfIdCard,
        capitalObject['capitalDrivingLicenceNumber'],
        form.value.dueTimeOfDrivingLicence,
        capitalObject['capitalTaxNumber'],
        form.value.healthCareNumber,
        capitalObject['capitalNationality']);
    } else {
      return new Users(
        null,
        capitalObject['capitalFullName'],
        capitalObject['capitalBirthName'],
        form.value.zipCode,
        capitalObject['capitalCity'],
        capitalObject['capitalAddress'],
        capitalObject['capitalBirthPlace'],
        form.value.phoneNumber,
        capitalObject['capitalEmail'],
        capitalObject['capitalNameOfMother'],
        form.value.birthDate,
        capitalObject['capitalPersonNumber'],
        capitalObject['capitalIdCardNumber'],
        form.value.dueTimeOfIdCard,
        capitalObject['capitalDrivingLicenceNumber'],
        form.value.dueTimeOfDrivingLicence,
        capitalObject['capitalTaxNumber'],
        form.value.healthCareNumber,
        capitalObject['capitalNationality']);
    }
  }

  private nullCheckOnAddress(form: any): boolean {
    let nullCounter = 0;
    nullCounter = form.value.zipCode == null || form.value.zipCode.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.city == null || form.value.city.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    nullCounter = form.value.address == null || form.value.address.length === 0 ? nullCounter += 1 : nullCounter -= 1;
    return Math.abs(nullCounter) === 3;
  }

  public itemChanged(form: any, fieldName: string) {
    if (Object.entries(form.value).length === 0 && form.value.constructor === Object || this.clearUserDataButtonPressed === true) {
      //we don't do anything, the object is empty
    } else {
      let user;
      if ('fullName' === fieldName && this.userData.birthName === this.userData.fullName) {
        form.value.birthName = form.value.fullName;
        this.userData.birthName = form.value.fullName;
        this.userData.fullName = form.value.fullName;
      } else if ('birthName' === fieldName) {
        this.userData.birthName = form.value.birthName;
      } else if ('fullName' === fieldName) {
        this.userData.fullName = form.value.fullName;
      }
      if (this.userData.id == null) {
        user = this.createUserObj(form, false);
      } else {
        user = this.createUserObj(form, true);
      }
      sessionStorage.setItem('newUser', JSON.stringify(user));
    }
  }

  private transformToCapitalData(form: any): Object {
    const capitalObject = {};
    capitalObject['capitalFullName'] = form.value.fullName != null ? form.value.fullName.toUpperCase() : null;
    capitalObject['capitalBirthName'] = form.value.birthName != null ? form.value.birthName.toUpperCase() : null;
    capitalObject['capitalCity'] = form.value.city != null ? form.value.city.toUpperCase() : null;
    capitalObject['capitalAddress'] = form.value.address != null ? form.value.address.toUpperCase() : null;
    capitalObject['capitalBirthPlace'] = form.value.birthPlace != null ? form.value.birthPlace.toUpperCase() : null;
    capitalObject['capitalEmail'] = this.emailFormControl.value != null ? this.emailFormControl.value.toUpperCase() : null;
    capitalObject['capitalNameOfMother'] = form.value.nameOfMother != null ? form.value.nameOfMother.toUpperCase() : null;
    capitalObject['capitalPersonNumber'] = form.value.personNumber != null ? form.value.personNumber.toUpperCase() : null;
    capitalObject['capitalIdCardNumber'] = form.value.idCardNumber != null ? form.value.idCardNumber.toUpperCase() : null;
    capitalObject['capitalDrivingLicenceNumber'] = form.value.drivingLicenceNumber != null ? form.value.drivingLicenceNumber.toUpperCase() : null;
    capitalObject['capitalNationality'] = form.value.nationality != null ? form.value.nationality.toUpperCase() : null;
    capitalObject['capitalTaxNumber'] = form.value.taxNumber != null ? form.value.taxNumber.toUpperCase() : null;
    return capitalObject;
  }

  public clearUserData() {
    this.clearUserDataButtonPressed = true;
    this.userSearchResult.data = null;
    this.indexOfPickedUser = null;
    this.userData = null;
    this.selectedUserFilter = null;
    sessionStorage.removeItem('userSearchDataOnUserPage');
    sessionStorage.removeItem('newUser');
    sessionStorage.removeItem('pickedUserOnUserPage');
    sessionStorage.removeItem('indexOfPickedUserOnUserPage');
    this.ngOnInit();
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

  public filterUser(form: any) {
    sessionStorage.removeItem('indexOfPickedUserOnUserPage');
    this.indexOfPickedUser = null;
    if (this.validateFormFieldLength(form.value)) {
      this.httpService.getUser(this.setFormValuesToUpperCase(form), this.selectedUserFilter.value).subscribe(data => {
        this.userSearchResult.data = data;
        this.changeDetectorRefs.detectChanges();
        sessionStorage.setItem('userSearchDataOnUserPage', JSON.stringify(data));
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

  public pickUser(index: number) {
    this.indexOfPickedUser = index;
    const pickedUserFromDataTable = this.userSearchResult.data[index];
    this.userData = new Users(
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
    sessionStorage.setItem('pickedUserOnUserPage', JSON.stringify(this.userData));
    sessionStorage.setItem('indexOfPickedUserOnUserPage', this.indexOfPickedUser.toString());
  }
}
