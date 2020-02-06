import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Users} from "../../models/users";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UtilService} from "../../services/util.service";
import {filter} from "rxjs/operators";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

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
  private currentUrl;
  private isCompleteAddress: boolean = true;

  constructor(private httpService: HttpService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router,) {
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
    if (this.userData == null) {
      this.userData = new Users(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    } else {
      this.emailFormControl.setValue(this.userData.email);
    }
  }

  public trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  public saveUser(form: any) {
    if (!this.emailFormControl.hasError('email') && this.nullCheckOnAddress(form)) {
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

  private checkZipCode(form: any) {
    if (form.value.zipCode && form.value.zipCode.length === 4 && !isNaN(form.value.zipCode)) {
      this.httpService.callZipCodeService(form.value.zipCode).subscribe(data => {
        this.userData.city = (data.zipCity).toUpperCase();
        form.value.city = (data.zipCity).toUpperCase();
        this.itemChanged(form);
      });
    }
  }

  private createUserObj(form: any, updateOrNew: boolean): Users {
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
        form.value.taxNumber,
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
        form.value.taxNumber,
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

  private itemChanged(form: any) {
    if (Object.entries(form.value).length === 0 && form.value.constructor === Object) {
      //we don't do anything, the object is empty
    } else {
      let user;
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
    return capitalObject;
  }

  private clearUserData() {
    this.userData = null;
    sessionStorage.removeItem('newUser');
    this.ngOnInit();
  }
}
